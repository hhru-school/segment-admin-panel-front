import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';

import { LayersList, LayerStatus } from 'models/layersList';

export interface Layer {
    id: number;
    title: string;
    description: string;
    createTime: string;
    layerStatus: LayerStatus;
    parentLayersList: LayersList;
}

interface CurrentLayerState {
    item: Layer | null;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchLayer = createAsyncThunk<Layer, number, { rejectValue: ApiError }>(
    'currentLayer/fetchLayer',
    async (id, thunkApi) => {
        let response: AxiosResponse<Layer>;

        try {
            response = await api.get<Layer>(`/layers/${id}`);
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: CurrentLayerState = {
    item: null,
    isLoading: true,
    error: null,
};

const currentLayerSlice = createSlice({
    name: 'currentLayer',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLayer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLayer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(fetchLayer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectCurrentLayer = (state: RootState): Layer | null => state.currentLayer.item;
const selectCurrentLayerError = (state: RootState): ApiError | null => state.currentLayer.error;
const selectCurrentLayerLoadingStatus = (state: RootState): boolean => state.currentLayer.isLoading;
const selectCurrentLayerTitle = (state: RootState): string => {
    const item = state.currentLayer.item;
    if (item === null) {
        return '';
    }
    return item.title;
};
const selectCurrentLayerParentLayers = (state: RootState): LayersList | null => {
    const item = state.currentLayer.item;
    if (item === null) {
        return item;
    }
    return item.parentLayersList;
};

const { reset } = currentLayerSlice.actions;

export default currentLayerSlice.reducer;
export {
    reset,
    fetchLayer,
    selectCurrentLayer,
    selectCurrentLayerTitle,
    selectCurrentLayerError,
    selectCurrentLayerLoadingStatus,
    selectCurrentLayerParentLayers,
};
