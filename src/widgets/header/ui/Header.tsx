import {format} from "date-fns";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {useUnit} from "effector-react/compat";
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {ConfigProvider, DatePicker, Select, TimePicker} from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import {$isBothDatesSelected} from "../../content/model/store.ts";
import {disabledRangeTime} from "../model/disabledRangeTime.ts";
import {
    $selectedDate,
    $selectedTimeRange, setSelectedDateFx,
    setSelectedEndDateTimeFx,
    setSelectedStartDateTimeFx, setSelectedTimeRangeFx
} from "../model/store.ts";

import {CalendarIcon} from './CalendarIcon.tsx';
import {LegendButton} from './LegendButton.tsx';
import {InstructionButton} from './InstructionButton.tsx';

import {Colors} from '../../../shared/ui/colors.ts';
import {dateFormat, timeFormat, disabledDate} from '../model/constants.ts';
import {formatDateTime} from '../lib/formatDateTime.ts';
import './header.scss';
import 'dayjs/locale/ru';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const Header = () => {
    const [
        isBothDatesSelected,
        selectedDate,
        selectedTimeRange
    ] = useUnit([
        $isBothDatesSelected,
        $selectedDate,
        $selectedTimeRange,
    ])

    useEffect(() => {
        if (selectedDate && selectedTimeRange) {
            const date = selectedDate.toDate();
            const [startTime, endTime] = selectedTimeRange;

            if (startTime && endTime) {
                const startDateTime = formatDateTime(date, startTime);
                const endDateTime = formatDateTime(date, endTime);

                setSelectedStartDateTimeFx(startDateTime);
                setSelectedEndDateTimeFx(endDateTime);
            }
        } else {
            setSelectedStartDateTimeFx(null);
            setSelectedEndDateTimeFx(null);
        }
    }, [selectedDate, selectedTimeRange]);

    return (
        <header className="coworking-header">
            <div className="filter-container">
                <ConfigProvider
                    locale={locale}
                    theme={{
                        token: {
                            colorPrimary: Colors.ParmaColor,
                            fontSize: 15,
                            borderRadius: 3,
                            controlHeight: 38,
                        },
                    }}
                >
                    <FontAwesomeIcon icon={faLocationDot}/>
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
                        showNow
                        suffixIcon={<CalendarIcon/>}
                        disabledDate={disabledDate}
                        allowClear={false}
                        onChange={(date) => setSelectedDateFx(date)}
                    />
                    <TimePicker.RangePicker
                        minuteStep={10}
                        format={timeFormat}
                        defaultValue={[dayjs(format(new Date(), timeFormat), timeFormat), null]}
                        changeOnBlur={true}
                        onChange={setSelectedTimeRangeFx}
                        value={selectedTimeRange}
                        status={isBothDatesSelected ? '' : 'warning'}
                        disabledTime={disabledRangeTime()}
                    />
                    <LegendButton/>
                    <InstructionButton/>
                </ConfigProvider>
            </div>
        </header>
    );
};
