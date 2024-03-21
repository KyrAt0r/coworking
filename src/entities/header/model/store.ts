import dayjs, {Dayjs} from 'dayjs';
import {createEffect, createStore, forward} from 'effector';

import type {Types} from '../types.ts';

//Сторы
export const $selectedDate = createStore<Dayjs | null>(dayjs().second(0));
export const $selectedTimeRange = createStore<Types | null>(null);
export const $selectedStartDateTime = createStore<string | null>(null);
export const $selectedEndDateTime = createStore<string | null>(null);

// Эффекты
export const setSelectedDateFx = createEffect<Dayjs | null, void>();
export const setSelectedTimeRangeFx = createEffect<Types | null, void>();
export const setSelectedStartDateTimeFx = createEffect<string | null, void>();
export const setSelectedEndDateTimeFx = createEffect<string | null, void>();

// Ивенты
$selectedDate.on(setSelectedDateFx, (_, value) => value);
$selectedTimeRange.on(setSelectedTimeRangeFx, (_, value) => value);
$selectedStartDateTime.on(setSelectedStartDateTimeFx, (_, value) => value);
$selectedEndDateTime.on(setSelectedEndDateTimeFx, (_, value) => value);

forward({
  from: setSelectedDateFx,
  to: setSelectedTimeRangeFx.prepend(() => null), // Сбрасываем $selectedTimeRange, устанавливая его значение в null
});
