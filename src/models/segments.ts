import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ApiError, apiErrorHandler } from 'api';
import sleep from 'helpers/sleep';
import { RootState } from 'store';

import { RolesList } from 'models/roles';

export interface Segment {
    id: number;
    title: string;
    description: string;
    parentSegmentId: number | null;
    createTime: string;
    roles: RolesList;
    tags: string[];
}
export type SegmentsList = Segment[];

interface SegmentsState {
    items: SegmentsList;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchSegments = createAsyncThunk<SegmentsList, undefined, { rejectValue: ApiError }>(
    'segments/fetchSegments',
    async (_, thunkApi) => {
        let response: AxiosResponse<SegmentsList>;

        try {
            await sleep(2000);
            response = await axios.get<SegmentsList>('/mocks/segments.json');
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: SegmentsState = {
    items: [],
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

const { reset } = segmentsSlice.actions;

export default segmentsSlice.reducer;
export { reset, fetchSegments, selectSegments, selectSegmentsError, selectSegmentsLoadingStatus };
