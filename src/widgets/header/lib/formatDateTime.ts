import { format } from 'date-fns';
import {type Dayjs} from "dayjs";

export const formatDateTime = (date: Date, time: Dayjs) =>
    format(date.setHours(time.hour(), time.minute(), time.second()), "yyyy-M-dd'T'HH:mm:ss");
