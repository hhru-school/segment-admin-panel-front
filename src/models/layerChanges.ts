import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import api, { ApiError, apiErrorHandler } from 'api';
import hasFields from 'helpers/hasField';
import isObject from 'helpers/isObject';
import { RootState } from 'store';

const STATUS_OF_CHANGES = ['CREATED', 'ARCHIVED'] as const;
type StatusOfChanges = (typeof STATUS_OF_CHANGES)[number];
type ChangesMap<T> = {
    [key in StatusOfChanges]: T | undefined;
};

interface Segment {
    id: number;
    parentId: number | null;
    title: string;
    description: string;
    archived: boolean;
    conflict: boolean;
}
type SegmentsList = Segment[];

interface EntryPoint {
    id: number;
    title: string;
    description: string;
    conflict: boolean;
}
type EntryPointList = EntryPoint[];

const ANSWER_TYPES = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'] as const;
type AnswerType = (typeof ANSWER_TYPES)[number];
export interface Answer {
    id: number;
    title: string;
    answerType: AnswerType;
    openQuestionList: QuestionList;
}
export type AnswerList = Answer[];

export interface Question {
    id: number;
    title: string;
    description: string;
    answerList: AnswerList;
}
export type QuestionList = Question[];
const isQuestion = (node: unknown): node is Question => {
    return isObject(node) && hasFields<Question>(node, ['id', 'title', 'description', 'answerList']);
};

const QUESTION_VISIBILITY_STATUS = ['SHOW', 'HIDE', 'HIDE_PREFILLED'] as const;
export type QuestionVisibilityStatus = (typeof QUESTION_VISIBILITY_STATUS)[number];
export interface Link {
    id: number;
    questionRequired: boolean;
    questionVisibility: QuestionVisibilityStatus;
    entrypointTitle: string;
    segmentTitle: string;
    questionTitle: string;
    conflict: boolean;
}
interface QuestionActivatorLinkMap {
    [key: string]: Link[] | undefined;
}

interface LayerChanges {
    id: number;
    parentLayerId: number;
    lastCompareLayerId: number | null;
    conflict: boolean;
    entrypointMap: ChangesMap<EntryPointList>;
    segmentMap: ChangesMap<SegmentsList>;
    questionMap: ChangesMap<QuestionList>;
    questionActivatorLinkMap: QuestionActivatorLinkMap;
    usedEntrypointTitleList: string[];
}

interface LayerChangesState {
    item: LayerChanges | null;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchLayerChanges = createAsyncThunk<LayerChanges, number, { rejectValue: ApiError }>(
    'layerChanges/fetchLayerChanges',
    async (id, thunkApi) => {
        let response: AxiosResponse<LayerChanges>;

        try {
            response = await api.get<LayerChanges>(`/layers/${id}/changes`);
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: LayerChangesState = {
    item: null,
    isLoading: true,
    error: null,
};

const layerChangesSlice = createSlice({
    name: 'layerChanges',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLayerChanges.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLayerChanges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(fetchLayerChanges.rejected, (state, action) => {
                state.isLoading = false;

                if (action.payload !== undefined) {
                    state.error = action.payload;
                } else {
                    state.error = { message: 'Произошла непредвиденная ошибка' };
                }
            });
    },
});

const selectLayerChangesError = (state: RootState): ApiError | null => state.currentLayerChanges.error;
const selectLayerChangesLoadingStatus = (state: RootState): boolean => state.currentLayerChanges.isLoading;
const selectCreatedSegments = (state: RootState): SegmentsList | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (state.currentLayerChanges.item.segmentMap.CREATED === undefined) {
        return null;
    }
    if (state.currentLayerChanges.item.segmentMap.CREATED.length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.segmentMap.CREATED;
};
const selectArchivedSegments = (state: RootState): SegmentsList | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (state.currentLayerChanges.item.segmentMap.ARCHIVED === undefined) {
        return null;
    }
    if (state.currentLayerChanges.item.segmentMap.ARCHIVED.length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.segmentMap.ARCHIVED;
};
const selectCreatedEntryPoints = (state: RootState): EntryPointList | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (state.currentLayerChanges.item.entrypointMap.CREATED === undefined) {
        return null;
    }
    if (state.currentLayerChanges.item.entrypointMap.CREATED.length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.entrypointMap.CREATED;
};
const selectArchivedEntryPoints = (state: RootState): EntryPointList | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (state.currentLayerChanges.item.entrypointMap.ARCHIVED === undefined) {
        return null;
    }
    if (state.currentLayerChanges.item.entrypointMap.ARCHIVED.length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.entrypointMap.ARCHIVED;
};
const selectCreatedQuestion = (state: RootState): QuestionList | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (state.currentLayerChanges.item.questionMap.CREATED === undefined) {
        return null;
    }
    if (state.currentLayerChanges.item.questionMap.CREATED.length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.questionMap.CREATED;
};
const selectArchivedQuestion = (state: RootState): QuestionList | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (state.currentLayerChanges.item.questionMap.ARCHIVED === undefined) {
        return null;
    }
    if (state.currentLayerChanges.item.questionMap.ARCHIVED.length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.questionMap.ARCHIVED;
};
const selectQuestionActivatorLinkMap = (state: RootState): QuestionActivatorLinkMap | null => {
    if (state.currentLayerChanges.item === null) {
        return null;
    }
    if (Object.keys(state.currentLayerChanges.item.questionActivatorLinkMap).length === 0) {
        return null;
    }
    return state.currentLayerChanges.item.questionActivatorLinkMap;
};

const { reset } = layerChangesSlice.actions;

export default layerChangesSlice.reducer;
export {
    reset,
    fetchLayerChanges,
    isQuestion,
    selectLayerChangesError,
    selectLayerChangesLoadingStatus,
    selectCreatedSegments,
    selectArchivedSegments,
    selectCreatedEntryPoints,
    selectArchivedEntryPoints,
    selectCreatedQuestion,
    selectArchivedQuestion,
    selectQuestionActivatorLinkMap,
};
