import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import { RootState } from 'store';
import { QuestionList } from 'types/field';

const enum FieldTypeParam {
    Question = 'question',
    ResumeField = 'resume_field',
}

interface FetchFieldsParams {
    type?: `${FieldTypeParam}`;
    searchQuery?: string;
}

const fetchFields = createAsyncThunk<QuestionList, FetchFieldsParams | undefined, { rejectValue: ApiError }>(
    'fields/fetchFields',
    async (params, thunkApi) => {
        let response: AxiosResponse<QuestionList>;
        try {
            response = await api.get<QuestionList>(`/questions`, {
                params,
            });
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

interface FieldsState {
    items: QuestionList;
    searchString: string;
    isLoading: boolean;
    error: ApiError | null;
}

const initialState: FieldsState = {
    items: [],
    searchString: '',
    isLoading: false,
    error: null,
};

const fieldsSlice = createSlice({
    name: 'fields',
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
            .addCase(fetchFields.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchFields.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectFieldsList = (state: RootState): QuestionList => state.fields.items;
const selectFieldsError = (state: RootState): ApiError | null => state.fields.error;
const selectFieldsLoadingStatus = (state: RootState): boolean => state.fields.isLoading;
const selectFieldsSearchString = (state: RootState): string => state.fields.searchString;

const { reset, setSearchString } = fieldsSlice.actions;

export default fieldsSlice.reducer;
export {
    reset,
    setSearchString,
    fetchFields,
    selectFieldsList,
    selectFieldsError,
    selectFieldsLoadingStatus,
    selectFieldsSearchString,
};
