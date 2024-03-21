import axios from 'axios';

import type {WorkSpace} from '../shared/interfaces/work-space.ts';

interface WorkSpaceResponse {
  data: WorkSpace[];
}

const apiCoworkingServiceEndpoint = import.meta.env.VITE_API_COWORKING_SERVICE_ENDPOINT;

// Настройка экземпляра axios
const axiosInstance = axios.create({
  baseURL: apiCoworkingServiceEndpoint,
  withCredentials: true,
});

// Получение рабочих мест по дате
export const getWorkplacesByDate = (
  startDate: string,
  endDate: string,
): Promise<WorkSpaceResponse> => {
  return axiosInstance.get(
    `/_vti_bin/CoworkingServices/CoworkingService.svc/GetWorkplacesByDate/${startDate}/${endDate}`,
  );
};

// Получение значения FormDigest
export const getFormDigestValue = () => {
  return axiosInstance.post('/_api/contextinfo');
};

// Создание встречи
export const createAppointment = (workplaceEmail: string, startDate: string, endDate: string) => {
  return getFormDigestValue().then((response) => {
    const formDigestValue = response.data.FormDigestValue;
    return axiosInstance.post(
      '/_vti_bin/CoworkingServices/CoworkingService.svc/CreateAppointment',
      {
        workplaceEmail,
        startDate,
        endDate,
      },
      {
        headers: {'X-RequestDigest': formDigestValue},
      },
    );
  });
};
