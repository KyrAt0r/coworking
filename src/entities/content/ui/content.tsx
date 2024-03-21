import {LoadingOutlined} from '@ant-design/icons';
import {message, Modal, Spin} from 'antd';
import {useStore} from 'effector-react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';

import {ReactComponent as RoomPlan} from '../../../assets/tables/cw.svg';
import getPhrase from '../../../shared/getPhrase.ts';
import type {WorkSpace} from '../../../shared/interfaces/work-space.ts';
import {$selectedEndDateTime, $selectedStartDateTime} from '../../header/model/store.ts';
import {
  $isBothDatesSelected,
  $workSpaceList,
  createAppointmentFx,
  loadWorkplacesFx,
} from '../model/store.ts';

import './contetn.scss';

type TableElement = SVGElement & {table_id: string};

const svgWidth = 926;
const svgHeight = 642;
const initialTranslateX = 543.3000183105469;
const initialTranslateY = 32.100006103515625;

export function Content() {
  // Определение состояний и рефов
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentWorkPlace, setCurrentWorkPlace] = useState<WorkSpace | null>(null);
  const [dataIsReady, setDataIsReady] = useState<boolean>(false);

  // Использование хранилищ Effector
  const workplaces = useStore($workSpaceList);
  const isBothDatesSelected = useStore($isBothDatesSelected);
  const selectedStartDateTime = useStore($selectedStartDateTime);
  const selectedEndDateTime = useStore($selectedEndDateTime);

  const svgRef = useRef<SVGSVGElement>(null);
  const selectedTableRef = useRef<TableElement | null>(null);

  const changeRectColors = useCallback(() => {
    if (workplaces && svgRef.current) {
      const rects = svgRef.current.querySelectorAll('rect');
      rects.forEach((rect) => {
        const id = rect.getAttribute('id');
        if (id) {
          const table = workplaces.find((item) => item.number === parseInt(id));
          if (table) {
            rect.style.fill = table.isBusy ? 'gray' : '#4bb34b';
          }
        }
      });
    }
  }, [workplaces]);

  useEffect(() => {
    // Загрузка данных происходит автоматически внутри эффекта, поэтому здесь только проверяем условия
    if (isBothDatesSelected && selectedStartDateTime && selectedEndDateTime) {
      setDataIsReady(false); // Устанавливаем состояние загрузки перед вызовом эффекта
      loadWorkplacesFx({
        startDateTime: selectedStartDateTime,
        endDateTime: selectedEndDateTime,
      }).finally(() => setDataIsReady(true)); // Восстанавливаем состояние после завершения операции
    }
  }, [isBothDatesSelected, selectedStartDateTime, selectedEndDateTime]);

  useEffect(() => {
    changeRectColors();
  }, [changeRectColors]);

  const handleClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      const clickedElement = (event.target as Element).closest('[table_id]');
      const table_id = clickedElement?.getAttribute('table_id');
      if (table_id && clickedElement && workplaces) {
        const currWorkPlace = workplaces.find((workplace) => workplace.number === Number(table_id));
        if (currWorkPlace && !currWorkPlace?.isBusy) {
          setIsModalVisible(true);
          setCurrentWorkPlace(currWorkPlace);

          if (selectedTableRef.current) {
            const currentRect = selectedTableRef.current.querySelector('rect');
            if (currentRect) {
              currentRect.style.fill = '#4bb34b';
            }
          }

          if (clickedElement) {
            const rect = clickedElement.querySelector('rect');
            if (rect) {
              rect.style.fill = '#FF0000';
            }
          }
          selectedTableRef.current = clickedElement as TableElement;
        }
      }
    },
    [workplaces],
  );

  const handleOk = () => {
    if (currentWorkPlace && selectedStartDateTime && selectedEndDateTime) {
      setIsModalVisible(false);
      createAppointmentFx({
        email: currentWorkPlace.email,
        startDateTime: selectedStartDateTime,
        endDateTime: selectedEndDateTime,
      })
        .then((res) => {
          console.log(res);
          successMessage(); // Показать сообщение об успехе
          setDataIsReady(false); // Отмечаем, что началась загрузка данных
          setTimeout(() => {
            loadWorkplacesFx({
              startDateTime: selectedStartDateTime,
              endDateTime: selectedEndDateTime,
            }).then(() => {
              setDataIsReady(true); // Завершаем загрузку данных
            });
          }, 2000);
        })
        .catch(() => {
          errorMessage();
        });
    }
  };

  const successMessage = () => {
    message.open({
      type: 'success',
      content: 'Стол успешно забронирован!',
      duration: 2,
    });
  };

  const errorMessage = () => {
    message.open({
      type: 'error',
      content: 'Упс... Кажется что-то пошло не так...',
      duration: 2,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Spin
        spinning={!dataIsReady}
        size="large"
        tip={getPhrase(isBothDatesSelected)}
        indicator={<LoadingOutlined style={{fontSize: 24, color: '#F13838'}} spin />}
        style={{color: '#F13838'}}
      >
        <div className="transform-wrapper-container" id="transform-wrapper-container">
          <TransformWrapper
            initialScale={0.9}
            minScale={0.5}
            maxScale={2}
            initialPositionX={initialTranslateX}
            initialPositionY={initialTranslateY}
          >
            <TransformComponent
              wrapperStyle={{
                backgroundColor: '#fff',
                width: '100%',
              }}
            >
              <svg
                ref={svgRef}
                width={svgWidth}
                height={svgHeight}
                onClick={handleClick}
                id="svg-plan"
              >
                <RoomPlan />
              </svg>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </Spin>

      <Modal
        title="Подтверждение бронирования стола"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Забронировать"
      >
        <p>Вы бронируйте стол № {currentWorkPlace && currentWorkPlace.number}</p>
      </Modal>
    </>
  );
}
