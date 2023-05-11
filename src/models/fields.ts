import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';
import { RootState } from 'store';

const QUESTION_TYPES = ['SINGLE_CHOICE', 'MULTI_SELECT', 'NONE'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];
export interface Question {
    id: number;
    title: string;
    description: string;
    type: QuestionType;
    searchedObject: boolean;
    answerDtoList: AnswerList;
}
export type QuestionList = Question[];
const isQuestion = (node: unknown): node is Question => {
    return isObject(node) && hasFields<Question>(node, ['answerDtoList']);
};

const ANSWER_TYPES = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'] as const;
export type AnswerType = (typeof ANSWER_TYPES)[number];
export interface Answer {
    id: number;
    title: string;
    positiveTitle: string;
    answerType: AnswerType;
    answerDefault: boolean;
    skipAtResult: boolean;
    searchedObject: boolean;
    openQuestonDtoList: QuestionList;
}
export type AnswerList = Answer[];

interface FetchFieldsParams {
    layerId: number;
    searchString: string;
}

const fetchFields = createAsyncThunk<QuestionList, FetchFieldsParams, { rejectValue: ApiError }>(
    'fields/fetchFields',
    async ({ layerId, searchString }, thunkApi) => {
        let response: AxiosResponse<QuestionList>;
        try {
            response = await api.get<QuestionList>(`/questions`, {
                params: {
                    layerId,
                    searchString,
                },
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
    isLoading: true,
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
                if (action.payload !== undefined) {
                    state.error = action.payload;
                } else {
                    state.error = { message: 'Произошла непредвиденная ошибка' };
                }
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
    isQuestion,
    selectFieldsList,
    selectFieldsError,
    selectFieldsLoadingStatus,
    selectFieldsSearchString,
};
