import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';

export interface Field {
    id: number;
    title: string;
}
export type FieldsList = Field[];

const PLATFORMS = ['ANDROID', 'IOS', 'WEB'] as const;
export type Platform = (typeof PLATFORMS)[number];
export interface Version {
    id: number;
    platform: Platform;
    version: string;
}
export type VersionsList = Version[];

const SCREEN_TYPES = ['STATIC', 'DYNAMIC'] as const;
const SCREEN_STATES = ['ACTIVE', 'ARCHIVED'] as const;
export type ScreenType = (typeof SCREEN_TYPES)[number];
type ScreenState = (typeof SCREEN_STATES)[number];
export interface Screen {
    id: number;
    title: string;
    description: string;
    type: ScreenType;
    state: ScreenState;
    fields: FieldsList;
    appVersions: VersionsList;
    filtered?: boolean;
}
export type ScreensList = Screen[];

const fetchScreens = createAsyncThunk<ScreensList, undefined, { rejectValue: ApiError }>(
    'screens/fetchScreens',
    async (_, thunkApi) => {
        let response: AxiosResponse<ScreensList>;
        try {
            response = await api.get('/screens');
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
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
