import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { GET_LAYERS_URL, ApiError, apiErrorHandler } from 'api';
import hasFields from 'helpers/hasField';
import isObject from 'helpers/isObject';
import { RootState } from 'store';

const LAYERS_STATUSES = ['ARCHIVED', 'EXPERIMENTAL', 'STABLE'] as const;

export type LayerStatus = (typeof LAYERS_STATUSES)[number];

export interface LayersListItem {
    id: number;
    title: string;
    createTime: string;
    layerStatus: LayerStatus;
}

function isLayersListItem(value: unknown): value is LayersListItem {
    return isObject(value) && hasFields<LayersListItem>(value, ['id', 'title', 'createTime', 'layerStatus']);
}

export type LayersList = LayersListItem[];

function isLayersList(value: unknown): value is LayersList {
    return Array.isArray(value) && (value.length === 0 ? true : value.every(isLayersListItem));
}

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

        if (!isLayersList(response.data)) {
            console.error(new TypeError('Получен не верный тип данных для списка слоев.'));
            return thunkApi.rejectWithValue({
                message: 'С сервера получены неверные данные. Обратитесь к администратору.',
            });
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
