import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

import type {WorkSpace} from '../lib/interfaces/work-space.ts';
import {WorkPlaceList} from "./work-place-list.ts";

interface WorkSpaceResponse {
    data: WorkSpace[];
}

const apiCoworkingServiceEndpoint = import.meta.env.VITE_API_COWORKING_SERVICE_ENDPOINT;
const mock = new MockAdapter(axios);

// Настройка экземпляра axios
const axiosInstance = axios.create({
    baseURL: apiCoworkingServiceEndpoint,
    withCredentials: true,
});

// Получение рабочих мест по дате
export const getWorkplacesByDate = async (
    startDate: string,
    endDate: string,
): Promise<WorkSpaceResponse> => {

    mock.onGet(new RegExp('/_api/GetWorkplacesByDate/.+/.+'))
        .reply(200, {
            data: WorkPlaceList
        });

    const response = await axiosInstance.get(
        `/_api/GetWorkplacesByDate/${startDate}/${endDate}`);
    return response.data;
};

// Получение значения FormDigest
export const getFormDigestValue = () => {
    mock.onPost('/_api/contextinfo')
        .reply(200, {
            FormDigestValue: "mockFormDigestValue"
        });

    return axiosInstance.post('/_api/contextinfo');
};

// Создание встречи
export const createAppointment = async (workplaceEmail: string, startDate: string, endDate: string) => {

    mock.onPost('/_api/CreateAppointment')
        .reply(200, {
            success: true
        });

    const response = await getFormDigestValue();
    const formDigestValue = response.data.FormDigestValue;
    return await axiosInstance.post(
        '/_api/CreateAppointment',
        {
            workplaceEmail,
            startDate,
            endDate,
        },
        {
            headers: {'X-RequestDigest': formDigestValue},
        });
};
