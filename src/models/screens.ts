import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { ScreensList } from 'types/screen';

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
    isLoading: false,
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
