import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';

export interface Field {
    id: number;
    title: string;
}
export type FieldsList = Field[];

export interface Version {
    id: number;
    platform: string;
    version?: string;
}
export type VersionsList = Version[];

const SCREEN_TYPES = ['STATIC', 'DYNAMIC'] as const;
export type ScreenType = (typeof SCREEN_TYPES)[number];
export interface Screen {
    id: number;
    title: string;
    type: ScreenType;
    fields: FieldsList;
    appVersions: VersionsList;
    filtered?: boolean;
}
export type ScreensList = Screen[];

// Удалить когда будет ручка
const MOCK_SCREENS: ScreensList = [
    {
        id: 1,
        title: 'main_1_45',
        type: 'STATIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 2, title: 'Фамилия' },
            { id: 3, title: 'Гражданство' },
            { id: 4, title: 'Разрешение на работу' },
        ],
        appVersions: [
            { id: 1, platform: 'iOS', version: '3.7+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 2,
        title: 'experience_24',
        type: 'DYNAMIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
        ],
        appVersions: [
            { id: 1, platform: 'iOS', version: '3.7+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 3,
        title: 'main_1_46',
        type: 'STATIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 2, title: 'Фамилия' },
            { id: 3, title: 'Гражданство' },
            { id: 6, title: 'Город' },
        ],
        appVersions: [
            { id: 4, platform: 'iOS', version: '3.8+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 4,
        title: 'main_3_3',
        type: 'DYNAMIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 5,
        title: 'main_3_3',
        type: 'DYNAMIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 6,
        title: 'main_3_3',
        type: 'STATIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 7,
        title: 'main_3_3',
        type: 'STATIC',
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 8,
        title: 'main_3_3',
        type: 'DYNAMIC',
        filtered: true,
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 9,
        title: 'main_3_3',
        type: 'DYNAMIC',
        filtered: true,
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
    {
        id: 10,
        title: 'main_3_3',
        type: 'DYNAMIC',
        filtered: true,
        fields: [
            { id: 1, title: 'Имя' },
            { id: 5, title: 'Опыт работы' },
            { id: 7, title: 'Портфолио' },
        ],
        appVersions: [
            { id: 5, platform: 'iOS', version: '3.9+' },
            { id: 2, platform: 'Android', version: '1.4+' },
            { id: 3, platform: 'Web' },
        ],
    },
];

const fetchScreens = createAsyncThunk<ScreensList, undefined, { rejectValue: ApiError }>(
    'screens/fetchScreens',
    async (_, thunkApi) => {
        let response: ScreensList;
        try {
            response = await new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_SCREENS), 3000);
            });
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response;
    }
);

interface ScreensState {
    items: ScreensList;
    isLoading: boolean;
    error: ApiError | null;
}

const initialState: ScreensState = {
    items: [],
    isLoading: true,
    error: null,
};

const screensSlice = createSlice({
    name: 'screens',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScreens.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchScreens.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchScreens.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectScreensList = (state: RootState): ScreensList => state.screens.items;
const selectScreensError = (state: RootState): ApiError | null => state.screens.error;
const selectScreensLoadingStatus = (state: RootState): boolean => state.screens.isLoading;

const { reset } = screensSlice.actions;

export default screensSlice.reducer;
export { reset, fetchScreens, selectScreensList, selectScreensError, selectScreensLoadingStatus };
