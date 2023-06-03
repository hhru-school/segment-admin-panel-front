import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { Question } from 'types/field';

const fetchField = createAsyncThunk<Question, number, { rejectValue: ApiError }>(
    'currentField/fetchField',
    async (id, thunkApi) => {
        let response: AxiosResponse<Question>;
        try {
            response = await api.get<Question>(`/questions/${id}`);
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
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectCurrentField = (state: RootState): Question | null => state.currentField.item;
const selectCurrentFieldError = (state: RootState): ApiError | null => state.currentField.error;
const selectCurrentFieldLoadingStatus = (state: RootState): boolean => state.currentField.isLoading;
const selectCurrentFieldTitle = (state: RootState): string | undefined => state.currentField.item?.title;

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
