import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { GET_LAYERS_URL, ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';

const LAYERS_STATUSES = ['ARCHIVED', 'EXPERIMENTAL', 'STABLE'] as const;

export type LayerStatus = (typeof LAYERS_STATUSES)[number];

export interface LayersListItem {
    id: number;
    title: string;
    createTime: string;
    layerStatus: LayerStatus;
}

export type LayersList = LayersListItem[];

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
            response = await api.get<LayersList>(GET_LAYERS_URL);
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: LayersListState = {
    items: [],
    isLoading: false,
    error: null,
};

const layersListSlice = createSlice({
    name: 'layersList',
    initialState,
    reducers: {},
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

                if (action.payload != null) {
                    state.error = action.payload;
                } else {
                    state.error = { message: 'Произошла непредвиденная ошибка' };
                }
            });
    },
});

const selectLayersList = (state: RootState): LayersList => state.layersList.items;
const selectLayersListError = (state: RootState): ApiError | null => state.layersList.error;
const selectLayersListLoadingStatus = (state: RootState): boolean => state.layersList.isLoading;

export default layersListSlice.reducer;
export { fetchLayersList, selectLayersList, selectLayersListError, selectLayersListLoadingStatus };
