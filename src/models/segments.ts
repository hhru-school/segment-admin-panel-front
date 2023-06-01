import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { SegmentsList } from 'types/segment';

interface SegmentsState {
    items: SegmentsList;
    searchString: string;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchSegments = createAsyncThunk<SegmentsList, string | undefined, { rejectValue: ApiError }>(
    'segments/fetchSegments',
    async (searchQuery, thunkApi) => {
        let response: AxiosResponse<SegmentsList>;

        try {
            response = await api.get<SegmentsList>('/segments', {
                params: {
                    searchQuery,
                },
            });
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        if (response.status === 204) {
            return [];
        }

        return response.data;
    }
);

const initialState: SegmentsState = {
    items: [],
    searchString: '',
    isLoading: true,
    error: null,
};

const segmentsSlice = createSlice({
    name: 'segments',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
        setSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSegments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSegments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchSegments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectSegments = (state: RootState): SegmentsList => state.segments.items;
const selectSegmentsError = (state: RootState): ApiError | null => state.segments.error;
const selectSegmentsLoadingStatus = (state: RootState): boolean => state.segments.isLoading;
const selectSegmentsSearchString = (state: RootState): string => state.segments.searchString;

const { reset, setSearchString } = segmentsSlice.actions;

export default segmentsSlice.reducer;
export {
    reset,
    setSearchString,
    fetchSegments,
    selectSegments,
    selectSegmentsError,
    selectSegmentsLoadingStatus,
    selectSegmentsSearchString,
};
