import {combine, createEffect, createStore} from "effector";

export const $selectedStartDateTime = createStore<string | null>(null);
export const $selectedEndDateTime = createStore<string | null>(null);

export const setSelectedStartDateTime = createEffect<string, void>();
export const setSelectedEndDateTime = createEffect<string, void>();

$selectedStartDateTime.on(setSelectedStartDateTime, (_, value) => value);
$selectedEndDateTime.on(setSelectedEndDateTime, (_, value) => value);

// Комбинированное хранилище, которое проверяет, что обе даты не равны null
export const $isBothDatesSelected = combine(
    $selectedStartDateTime,
    $selectedEndDateTime,
    (start, end) => start !== null && end !== null
);

