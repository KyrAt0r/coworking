import dayjs from 'dayjs';
import {useStore} from 'effector-react';

import {$selectedDate} from './store.ts';

export const useDisabledTime = () => {
  const selectedDate = useStore($selectedDate);

  const disabledDateTime = () => {
    if (!selectedDate || selectedDate.isSame(dayjs(), 'day')) {
      const currentHour = dayjs().hour();
      const currentMinute = dayjs().minute();

      return {
        disabledHours: () => range(0, currentHour),
        disabledMinutes: (selectedHour: number) =>
          selectedDate && selectedHour === currentHour ? range(0, currentMinute) : [],
      };
    }
    return {};
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  return disabledDateTime;
};
