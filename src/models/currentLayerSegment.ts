import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { SegmentEntryPointList } from 'types/entryPoint';
import { SegmentFieldList } from 'types/field';
import { LayerSegment } from 'types/segment';

interface CurrentLayerSegmentState {
    item: LayerSegment | null;
    isLoading: boolean;
    error: ApiError | null;
}

interface FetchLayerSegmentParams {
    layerId: number;
    segmentId: number;
}

const fetchLayerSegment = createAsyncThunk<LayerSegment, FetchLayerSegmentParams, { rejectValue: ApiError }>(
    'currentLayerSegment/fetchLayerSegment',
    async ({ layerId, segmentId }, thunkApi) => {
        let response: AxiosResponse<LayerSegment>;

        try {
            response = await api.get<LayerSegment>(`/layers/${layerId}/segments/${segmentId}`);
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: CurrentLayerSegmentState = {
    item: null,
    isLoading: false,
    error: null,
};

const currentLayerSegmentSlice = createSlice({
    name: 'currentLayerSegment',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLayerSegment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLayerSegment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(fetchLayerSegment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectCurrentLayerSegment = (state: RootState): LayerSegment | null => state.currentLayerSegment.item;
const selectCurrentLayerSegmentError = (state: RootState): ApiError | null => state.currentLayerSegment.error;
const selectCurrentLayerSegmentLoadingStatus = (state: RootState): boolean => state.currentLayerSegment.isLoading;
const selectCurrentLayerSegmentEntryPoints = (state: RootState): SegmentEntryPointList => {
    return state.currentLayerSegment.item?.entryPoints || [];
};
const selectCurrentLayerSegmentFields = (state: RootState): SegmentFieldList => {
    return state.currentLayerSegment.item?.fields || [];
};

const { reset } = currentLayerSegmentSlice.actions;

export default currentLayerSegmentSlice.reducer;
export {
    reset,
    fetchLayerSegment,
    selectCurrentLayerSegment,
    selectCurrentLayerSegmentError,
    selectCurrentLayerSegmentLoadingStatus,
    selectCurrentLayerSegmentEntryPoints,
    selectCurrentLayerSegmentFields,
};
