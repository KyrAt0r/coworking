import {InfoCircleOutlined} from '@ant-design/icons';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, ConfigProvider, DatePicker, Modal, Select, TimePicker} from 'antd';
import locale from 'antd/locale/ru_RU';
import {format, setHours, setMinutes, setSeconds} from 'date-fns';
import dayjs, {Dayjs} from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {useStore} from 'effector-react';
import React, {useEffect} from 'react';

import {LegendModal} from '../../../features/legendModal/legendModal.tsx';
import {$isBothDatesSelected} from '../../content/model/store.ts';
import {dateFormat, timeFormat, today} from '../lib/const.ts';
import {useDisabledTime} from '../model/disabledRangeTime.ts';
import {
  $selectedDate,
  $selectedTimeRange,
  setSelectedDateFx,
  setSelectedEndDateTimeFx,
  setSelectedStartDateTimeFx,
  setSelectedTimeRangeFx,
} from '../model/store.ts';

import './header.scss';
import 'dayjs/locale/ru';

const CalendarIcon = () => {
  return <i className="icon-calendar" />;
};

dayjs.locale('ru');
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function Header() {
  const isBothDatesSelected = useStore($isBothDatesSelected);
  const selectedDate = useStore($selectedDate);
  const selectedTimeRange = useStore($selectedTimeRange);

  useEffect(() => {
    if (selectedDate && selectedTimeRange) {
      const date: Date = selectedDate.toDate();
      const [startTime, endTime] = selectedTimeRange;

      if (startTime && endTime) {
        const endTimeSec = endTime.second(0);
        const startDateTime = setSeconds(
          setMinutes(setHours(date, startTime.hour()), startTime.minute()),
          startTime.second(),
        );
        const endDateTime = setSeconds(
          setMinutes(setHours(date, endTime.hour()), endTime.minute()),
          endTimeSec.second(),
        );

        setSelectedStartDateTimeFx(format(startDateTime, "yyyy-M-dd'T'HH:mm:ss"));
        setSelectedEndDateTimeFx(format(endDateTime, "yyyy-M-dd'T'HH:mm:ss"));
      }
    } else {
      setSelectedStartDateTimeFx(null);
      setSelectedEndDateTimeFx(null);
    }
  }, [selectedDate, selectedTimeRange]);

  const info = () => {
    Modal.info({
      title: 'Легенда',
      content: <LegendModal />,
      onOk() {},
    });
  };

  const disabledDate = (current: Dayjs): boolean => {
    return today.isSameOrAfter(current);
  };

  const openInstruction = () => {
    window.open('https://conf.parma.ru/pages/viewpage.action?pageId=209729339', '_blank');
  };

  return (
    <header className="coworking-header">
      <div className="filter-container">
        <ConfigProvider
          locale={locale}
          theme={{
            token: {
              colorPrimary: '#F13838',
              fontSize: 15,
              borderRadius: 3,
              controlHeight: 38,
            },
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} />
          <Select
            defaultValue="Пермь"
            style={{width: 100}}
            options={[{value: 'Perm', label: 'Пермь'}]}
            disabled
          />
          <Select
            defaultValue="Кабинет 203"
            options={[{value: 'room203', label: 'Кабинет 203'}]}
            disabled
          />
          <DatePicker
            format={dateFormat}
            value={selectedDate}
            popupClassName="custom"
            showNow={true}
            suffixIcon={<CalendarIcon />}
            disabledDate={disabledDate}
            allowClear={false}
            onChange={setSelectedDateFx}
          />
          <TimePicker.RangePicker
            minuteStep={10}
            format={timeFormat}
            defaultValue={[dayjs(format(new Date(), timeFormat), timeFormat), null]}
            changeOnBlur={true}
            onChange={setSelectedTimeRangeFx}
            value={selectedTimeRange}
            status={isBothDatesSelected ? '' : 'warning'}
            disabledTime={useDisabledTime()}
          />
          <Button onClick={info} icon={<InfoCircleOutlined style={{color: '#4bb34b'}} />}>
            Легенда
          </Button>
          <Button
            onClick={openInstruction}
            icon={<InfoCircleOutlined style={{color: '#0065FF'}} />}
          >
            Инструкция
          </Button>
        </ConfigProvider>
      </div>
    </header>
  );
}
