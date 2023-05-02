import axios, { isAxiosError } from 'axios';

import hasFields from 'helpers/hasField';
import isObject from 'helpers/isObject';

export interface ApiError {
    message: string;
    code?: number;
}
const isApiError = (error: unknown): error is ApiError =>
    isObject(error) && hasFields<ApiError>(error, ['message', 'code']);

const api = axios.create({
    baseURL: '/api',
});

const apiErrorHandler = (error: unknown): ApiError => {
    if (isAxiosError(error)) {
        if (error.response) {
            console.error(`${error.name}: ${error.message}`, error.response);
            return { message: 'Произошла ошибка. Попробуйте перезагрузить страницу', code: error.response.status };
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
