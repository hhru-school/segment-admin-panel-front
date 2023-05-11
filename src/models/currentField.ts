import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';

import { Question } from 'models/fields';

interface FetchFieldParams {
    layerId: number;
    questionId: number;
}

const fetchField = createAsyncThunk<Question, FetchFieldParams, { rejectValue: ApiError }>(
    'currentField/fetchField',
    async ({ layerId, questionId }, thunkApi) => {
        let response: AxiosResponse<Question>;
        try {
            response = await api.get<Question>(`/questions/detail`, {
                params: {
                    layerId,
                    questionId,
                },
            });
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

interface CurrentFieldState {
    item: Question | null;
    isLoading: boolean;
    error: ApiError | null;
}

const initialState: CurrentFieldState = {
    item: null,
    isLoading: true,
    error: null,
};

const currentFieldSlice = createSlice({
    name: 'currentField',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchField.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchField.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(fetchField.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload !== undefined) {
                    state.error = action.payload;
                } else {
                    state.error = { message: 'Произошла непредвиденная ошибка' };
                }
            });
    },
});

const selectCurrentField = (state: RootState): Question | null => state.currentField.item;
const selectCurrentFieldError = (state: RootState): ApiError | null => state.currentField.error;
const selectCurrentFieldLoadingStatus = (state: RootState): boolean => state.currentField.isLoading;
const selectCurrentFieldTitle = (state: RootState): string => state.currentField.item?.title || '';

const { reset } = currentFieldSlice.actions;

export default currentFieldSlice.reducer;
export {
    reset,
    fetchField,
    selectCurrentField,
    selectCurrentFieldError,
    selectCurrentFieldLoadingStatus,
    selectCurrentFieldTitle,
};
