import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { LayerSegments, LayerSegmentsList } from 'types/segment';

interface CurrentLayerSegmentsState {
    item: LayerSegments | null;
    searchString: string;
    isLoading: boolean;
    error: ApiError | null;
}

interface FetchLayerSegmentsParams {
    layerId: number;
    searchQuery?: string;
}

const fetchLayerSegments = createAsyncThunk<LayerSegments, FetchLayerSegmentsParams, { rejectValue: ApiError }>(
    'currentLayerSegments/fetchLayerSegments',
    async ({ layerId, searchQuery }, thunkApi) => {
        let response: AxiosResponse<LayerSegments>;

        try {
            response = await api.get<LayerSegments>(`/layers/${layerId}/segments`, {
                params: {
                    searchQuery,
                },
            });
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: CurrentLayerSegmentsState = {
    item: null,
    searchString: '',
    isLoading: true,
    error: null,
};

const currentLayerSegmentsSlice = createSlice({
    name: 'currentLayerSegments',
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
            .addCase(fetchLayerSegments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLayerSegments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(fetchLayerSegments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectCurrentLayerSegments = (state: RootState): LayerSegments | null => state.currentLayerSegments.item;
const selectCurrentLayerSegmentsList = (state: RootState): LayerSegmentsList => {
    return state.currentLayerSegments.item?.segments || [];
};
const selectCurrentLayerSegmentsError = (state: RootState): ApiError | null => state.currentLayerSegments.error;
const selectCurrentLayerSegmentsLoadingStatus = (state: RootState): boolean => state.currentLayerSegments.isLoading;
const selectCurrentLayerSegmentsSearchString = (state: RootState): string => state.currentLayerSegments.searchString;

const { reset, setSearchString } = currentLayerSegmentsSlice.actions;

export default currentLayerSegmentsSlice.reducer;
export {
    reset,
    setSearchString,
    fetchLayerSegments,
    selectCurrentLayerSegments,
    selectCurrentLayerSegmentsList,
    selectCurrentLayerSegmentsError,
    selectCurrentLayerSegmentsLoadingStatus,
    selectCurrentLayerSegmentsSearchString,
};
