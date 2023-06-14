import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { Segment } from 'types/segment';

interface CurrentSegmentState {
    item: Segment | null;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchSegment = createAsyncThunk<Segment, number, { rejectValue: ApiError }>(
    'currentSegment/fetchSegment',
    async (id, thunkApi) => {
        let response: AxiosResponse<Segment>;

        try {
            response = await api.get<Segment>(`/segments/${id}`);
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: CurrentSegmentState = {
    item: null,
    isLoading: false,
    error: null,
};

const currentSegmentSlice = createSlice({
    name: 'currentSegment',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Segment>) => {
            state.item = action.payload;
            return state;
        },
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSegment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSegment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(fetchSegment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectCurrentSegment = (state: RootState): Segment | null => state.currentSegment.item;
const selectCurrentSegmentError = (state: RootState): ApiError | null => state.currentSegment.error;
const selectCurrentSegmentLoadingStatus = (state: RootState): boolean => state.currentSegment.isLoading;
const selectCurrentSegmentTitle = (state: RootState): string | undefined => state.currentSegment.item?.title;

const { set, reset } = currentSegmentSlice.actions;

export default currentSegmentSlice.reducer;
export {
    set,
    reset,
    fetchSegment,
    selectCurrentSegment,
    selectCurrentSegmentTitle,
    selectCurrentSegmentError,
    selectCurrentSegmentLoadingStatus,
};
