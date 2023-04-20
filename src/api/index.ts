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
            switch (error.response.status) {
                case 400:
                    return { message: 'Плохой запрос.' };
                case 404:
                    return { message: 'Ресурс не найден.', code: 404 };
                case 500:
                    return { message: 'Внутренняя ошибка сервера.' };
            }
            return { message: 'Произошла необработанная ошибка.' };
        }

        if (error.request) {
            console.error(`${error.name}: ${error.message}`, error.request);
            return { message: 'Не удалось установить соединение с сервером.' };
        }
    }

    console.error(error);
    return { message: 'Произошла непредвиденная ошибка.' };
};

export default api;
export { GET_LAYERS_URL, apiErrorHandler };
