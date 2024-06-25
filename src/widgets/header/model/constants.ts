import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/ru';

export const timeFormat = 'HH:mm';
export const dateFormat = 'DD.MM.YY';
export const today = dayjs().startOf('day');

dayjs.locale('ru');

export const disabledDate = (current: Dayjs) => today.isSameOrAfter(current);
