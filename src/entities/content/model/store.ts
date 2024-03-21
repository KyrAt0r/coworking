import {combine, createEffect, createStore} from 'effector';

import {createAppointment, getWorkplacesByDate} from '../../../api/coworking.ts';
import type {WorkSpace} from '../../../shared/interfaces/work-space.ts';
import {$selectedEndDateTime, $selectedStartDateTime} from '../../header/model/store.ts';

export const $workSpaceList = createStore<WorkSpace[] | null>(null);
export const $loadWorkplacesError = createStore<Error | null>(null);

export const setWorkSpaceListFx = createEffect<WorkSpace[], void>();

$workSpaceList.on(setWorkSpaceListFx, (_, value) => value);

// Создание эффекта для загрузки рабочих мест
export const loadWorkplacesFx = createEffect(
  async ({startDateTime, endDateTime}: {startDateTime: string; endDateTime: string}) => {
    try {
      const response = await getWorkplacesByDate(startDateTime, endDateTime);
      setWorkSpaceListFx(response.data);
    } catch (error) {
      console.error(error);
      // Обработка ошибок, например, через эффект или хранилище для сообщений об ошибках
    }
  },
);

// Обновление списка рабочих мест при успешном завершении эффекта
$workSpaceList.on(loadWorkplacesFx.doneData, (_, workSpaces) => workSpaces);

// Обработка ошибок
$loadWorkplacesError.on(loadWorkplacesFx.failData, (_, error) => error);

// Комбинированное хранилище, которое проверяет, что обе даты не равны null
export const $isBothDatesSelected = combine(
  $selectedStartDateTime,
  $selectedEndDateTime,
  (start, end) => start !== null && end !== null,
);

// Подписка на изменения дат для автоматической загрузки рабочих мест
combine($selectedStartDateTime, $selectedEndDateTime).watch(([startDateTime, endDateTime]) => {
  if (startDateTime && endDateTime) {
    loadWorkplacesFx({startDateTime, endDateTime});
  }
});

export const createAppointmentFx = createEffect(
  async ({
    email,
    startDateTime,
    endDateTime,
  }: {
    email: string;
    startDateTime: string;
    endDateTime: string;
  }) => {
    const result = await createAppointment(email, startDateTime, endDateTime);
    if (result.data.CreateAppointmentResult) {
      return result.data;
    } else {
      throw new Error('Ошибка при создании бронирования');
    }
  },
);
