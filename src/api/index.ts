import axios, { isAxiosError } from 'axios';

import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';

interface ApiErrorData {
    responseCode: number;
    message: string;
}
export interface ApiError {
    message: string;
    code?: number;
    data?: ApiErrorData | null;
}

const isApiErrorData = (data: unknown): data is ApiErrorData => {
    return isObject(data) && hasFields<ApiErrorData>(data, ['responseCode', 'message']);
};
const isApiError = (error: unknown): error is ApiError => isObject(error) && hasFields<ApiError>(error, ['message']);

const api = axios.create({
    baseURL: '/api',
});

const apiErrorHandler = (error: unknown): ApiError => {
    if (isAxiosError(error)) {
        if (error.response) {
            const data = isApiErrorData(error.response.data) ? error.response.data : null;
            console.error(`${error.name}: ${error.message}`, error.response);
            return {
                message: 'Произошла ошибка. Попробуйте перезагрузить страницу',
                data,
                code: error.response.status,
            };
        }

        if (error.request) {
            console.error(`${error.name}: ${error.message}`, error.request);
            return { message: 'Не удалось установить соединение с сервером. Попробуйте повторить попытку позже.' };
        }
    }

    console.error(error);
    return { message: 'Произошла непредвиденная ошибка. Обратитесь к администратору.' };
};

export default api;
export { apiErrorHandler, isApiError };
