import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { LayersList } from 'types/layer';

interface LayersListState {
    items: LayersList;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchLayersList = createAsyncThunk<LayersList, undefined, { rejectValue: ApiError }>(
    'layersList/fetchLayersList',
    async (_, thunkApi) => {
        let response: AxiosResponse<LayersList>;

        try {
            response = await api.get<LayersList>('/layers');
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: LayersListState = {
    items: [],
    isLoading: true,
    error: null,
};

const layersListSlice = createSlice({
    name: 'layersList',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLayersList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLayersList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchLayersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectLayersList = (state: RootState): LayersList => state.layersList.items;
const selectLayersListError = (state: RootState): ApiError | null => state.layersList.error;
const selectLayersListLoadingStatus = (state: RootState): boolean => state.layersList.isLoading;

const { reset } = layersListSlice.actions;

export default layersListSlice.reducer;
export { reset, fetchLayersList, selectLayersList, selectLayersListError, selectLayersListLoadingStatus };
