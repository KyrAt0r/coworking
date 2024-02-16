import axios from 'axios';
import { environment } from '../environments/environment'; // Настройте этот импорт в соответствии с вашей структурой проекта

const apiEndpoint = environment.apiCoworkingServiceEndpoint;

// Настройка экземпляра axios
const axiosInstance = axios.create({
    baseURL: apiEndpoint,
    withCredentials: true,
});

// Получение рабочих мест по дате
export const getWorkplacesByDate = (startDate: any, endDate: any) => {
    return axiosInstance.get(`/vti_bin/CoworkingServices/CoworkingService.svc/GetWorkplacesByDate/${startDate}/${endDate}`);
};

// Получение значения FormDigest
export const getFormDigestValue = () => {
    return axiosInstance.post('/_api/contextinfo');
};

// Создание встречи
export const createAppointment = (workplaceEmail: any, startDate: any, endDate: any) => {
    return getFormDigestValue().then(response => {
        const formDigestValue = response.data.FormDigestValue;
        return axiosInstance.post('/_vti_bin/CoworkingServices/CoworkingService.svc/CreateAppointment', {
            workplaceEmail,
            startDate,
            endDate
        }, {
            headers: { 'X-RequestDigest': formDigestValue },
        });
    });
};
