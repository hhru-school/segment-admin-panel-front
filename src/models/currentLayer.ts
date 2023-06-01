import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { Layer, LayersList } from 'types/layer';

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
const selectCurrentLayerTitle = (state: RootState): string | undefined => state.currentLayer.item?.title;
const selectCurrentLayerParentLayers = (state: RootState): LayersList | null =>
    state.currentLayer.item?.parentLayersList || null;
const selectCurrentLayerId = (state: RootState): number | null => state.currentLayer.item?.id || null;

const { reset } = currentLayerSlice.actions;

export default currentLayerSlice.reducer;
export {
    reset,
    fetchLayer,
    selectCurrentLayer,
    selectCurrentLayerId,
    selectCurrentLayerTitle,
    selectCurrentLayerError,
    selectCurrentLayerLoadingStatus,
    selectCurrentLayerParentLayers,
};
