import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { EntryPointList } from 'types/entryPoint';

const fetchEntryPoints = createAsyncThunk<EntryPointList, undefined, { rejectValue: ApiError }>(
    'entryPoints/fetchEntryPoints',
    async (_, thunkApi) => {
        let response: AxiosResponse<EntryPointList>;
        try {
            response = await api.get<EntryPointList>(`/entrypoints`);
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

interface EntryPointsState {
    items: EntryPointList;
    searchString: string;
    isLoading: boolean;
    error: ApiError | null;
}

const initialState: EntryPointsState = {
    items: [],
    searchString: '',
    isLoading: false,
    error: null,
};

const entryPointsSlice = createSlice({
    name: 'entryPoints',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntryPoints.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEntryPoints.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchEntryPoints.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectEntryPointsList = (state: RootState): EntryPointList => state.entryPoints.items;
const selectEntryPointsError = (state: RootState): ApiError | null => state.entryPoints.error;
const selectEntryPointsLoadingStatus = (state: RootState): boolean => state.entryPoints.isLoading;

const { reset } = entryPointsSlice.actions;

export default entryPointsSlice.reducer;
export { reset, fetchEntryPoints, selectEntryPointsList, selectEntryPointsError, selectEntryPointsLoadingStatus };
