import axios, { isAxiosError } from 'axios';

export interface ApiError {
    message: string;
    code?: number;
}

const BASE_URL = '/api';
const GET_LAYERS_URL = '/layers';

const api = axios.create({
    baseURL: BASE_URL,
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
export { GET_LAYERS_URL, apiErrorHandler };
