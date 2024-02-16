import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import { ConfigProvider, DatePicker, TimePicker, Select, Button, Modal } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { format, setHours, setMinutes, setSeconds } from 'date-fns';

import "./header.scss"
import {
    setSelectedEndDateTime,
    setSelectedStartDateTime
} from "../../../pages/model/store.ts";
import {LegendModal} from "../../../features/legendModal/legendModal.tsx";

const IcoMoonIcon = () => {
    return <i className="icon-calendar" />;
};

dayjs.locale('ru')
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

type RangeValue = Parameters<NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>>[0]

export function Header() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState<RangeValue | null>(null);

    const timeFormat = 'HH:mm';
    const dateFormat = 'DD.MM.YY';
    const today = dayjs().startOf('day');


    useEffect(() => {
        setSelectedDate(dayjs());
    }, []);

    useEffect(() => {
        if (selectedDate && selectedTimeRange) {
            const date: Date = selectedDate.toDate();
            const [startTime, endTime] = selectedTimeRange;

            if (startTime && endTime) {
                const startDateTime = setSeconds(setMinutes(setHours(date, startTime.hour()), startTime.minute()), startTime.second());
                const endDateTime = setSeconds(setMinutes(setHours(date, endTime.hour()), endTime.minute()), endTime.second());

                setSelectedStartDateTime(format(startDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss'));
                setSelectedEndDateTime(format(endDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss'));
            }
        }
    }, [selectedDate, selectedTimeRange]);

    const info = () => {
        Modal.info({
            title: 'Инструкция',
            content: (
                <LegendModal/>
            ),
            onOk() { },
        });
    };

    const disabledDate = (current: Dayjs): boolean => {
        return today.isSameOrAfter(current);
    };

    const onChangeDate = (value: Dayjs | null) => {
        setSelectedDate(value);
    };

    const onChangeTime = (value: RangeValue | null) => {
        setSelectedTimeRange(value);
    };

    return (
        <header className="header">
            <div className="сity">
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
                    <Select defaultValue="Пермь" style={{ width: 100 }} options={[{ value: 'Perm', label: 'Пермь' }]} />
                    <Select defaultValue="Кабинет 203" options={[{ value: 'room203', label: 'Кабинет 203' }]} />
                    <DatePicker
                        format={dateFormat}
                        value={selectedDate}
                        popupClassName="custom"
                        showNow={true}
                        suffixIcon={<IcoMoonIcon />}
                        disabledDate={disabledDate}
                        allowClear={false}
                        onChange={onChangeDate}
                    />
                    <TimePicker.RangePicker
                        minuteStep={10}
                        format={timeFormat}
                        defaultValue={[dayjs((format(new Date(), timeFormat)), timeFormat), null]}
                        changeOnBlur={true}
                        onChange={onChangeTime}
                    />
                    <Button onClick={info} icon={<InfoCircleOutlined />} title={'Инструкция'}>Инструкция</Button>
                </ConfigProvider>
            </div>
        </header>
    );
}
