import { useUnit } from 'effector-react';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { ReactComponent as RoomPlan } from '../../../assets/tables/cw.svg';
import {initialTranslateX, initialTranslateY, svgHeight, svgWidth} from "../lib/const.ts";
import {
    $isBothDatesSelected,
    $workSpaceList,
    createAppointmentFx,
    loadWorkplacesFx
} from "../model/store.ts";
import type {WorkSpace} from "../../../shared/lib/interfaces/work-space.ts";
import {$selectedEndDateTime, $selectedStartDateTime} from "../../header/model/store.ts";
import {errorMessage, successMessage} from "../lib/messages.ts";
import { useWorkplaceLoader } from '../model/hooks.ts';
import { changeRectColors } from '../lib/utils.ts';
import { Colors } from '../../../shared/ui/colors.ts';

import { BookingModal } from './BookingModal.tsx';
import { SpinIndicator } from './SpinIndicator.tsx';

import './Content.scss';

type TableElement = SVGElement & { table_id: string };

export const Content: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentWorkPlace, setCurrentWorkPlace] = useState<WorkSpace | null>(null);

    // Использование хранилищ Effector
    const [
        workplaces,
        isBothDatesSelected,
        selectedStartDateTime,
        selectedEndDateTime,

    ] = useUnit([
        $workSpaceList,
        $isBothDatesSelected,
        $selectedStartDateTime,
        $selectedEndDateTime,
    ])

    const svgRef = useRef<SVGSVGElement>(null);
    const selectedTableRef = useRef<TableElement | null>(null);

    const isDataReady = useWorkplaceLoader();

    useEffect(() => {
        changeRectColors(svgRef, workplaces);
    }, [workplaces]);

    const handleClick = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
            const clickedElement = (event.target as Element).closest('[table_id]') as TableElement;
            const table_id = clickedElement?.getAttribute('table_id');

            if (table_id && workplaces) {
                const currWorkPlace = workplaces.find((workplace) => workplace.number === Number(table_id));
                if (currWorkPlace && !currWorkPlace.isBusy) {
                    setIsModalVisible(true);
                    setCurrentWorkPlace(currWorkPlace);
                    if (selectedTableRef.current) {
                        const currentRect = selectedTableRef.current.querySelector('rect');
                        if (currentRect && currentRect.style.fill !== Colors.Gray) {
                            currentRect.style.fill = Colors.Green;
                        }
                    }
                    const rect = clickedElement.querySelector('rect');
                    if (rect) {
                        rect.style.fill = Colors.Red;
                    }
                    selectedTableRef.current = clickedElement;
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
                .then(() => {
                    successMessage();
                    setTimeout(() => {
                        loadWorkplacesFx({
                            startDateTime: selectedStartDateTime,
                            endDateTime: selectedEndDateTime,
                        });
                    }, 2000); // Костыль для того что бы места успевали прогружаться на беке, так как с бека нет отета типо "Всё ок, я забронил можно подргружать актуальные данные"
                })
                .catch(errorMessage);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <SpinIndicator spinning={!isDataReady} isBothDatesSelected={isBothDatesSelected} spinSize={"large"}>
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
                                backgroundColor: Colors.White,
                                width: '100%',
                            }}
                        >
                            <svg ref={svgRef} width={svgWidth} height={svgHeight} onClick={handleClick} id="svg-plan">
                                <RoomPlan />
                            </svg>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
            </SpinIndicator>

            <BookingModal
                isVisible={isModalVisible}
                currentWorkPlace={currentWorkPlace}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </>
    );
};
