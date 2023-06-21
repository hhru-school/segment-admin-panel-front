import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';

import { ActiveState } from 'types/common';

export const enum AnswerTypes {
    Positive = 'POSITIVE',
    Negative = 'NEGATIVE',
    Neutral = 'NEUTRAL',
}
export const enum AnswersTypes {
    SingleChoice = 'SINGLE_CHOICE',
    MultiSelect = 'MULTI_SELECT',
    None = 'NONE',
}
export const enum FieldTypes {
    Question = 'QUESTION',
    ResumeField = 'RESUME_FIELD',
}
export const enum FieldVisibilityStates {
    Show = 'SHOW',
    Hide = 'HIDE',
    ShowPrefilled = 'SHOW_PREFILLED',
    HidePrefilled = 'HIDE_PREFILLED',
}

export type AnswerType = `${AnswerTypes}`;
export type AnswersType = `${AnswersTypes}`;
export type FieldType = `${FieldTypes}`;
export type FieldVisibilityState = `${FieldVisibilityStates}`;
export type AnswerList = Answer[];
export type FieldsList = Field[];
export type QuestionList = Question[];
export type SegmentFieldList = SegmentField[];
export type ScreenFieldList = ScreenField[];
export type SegmentFieldDetailsList = SegmentFieldDetails[];
export type ScreenFieldDetailsList = ScreenFieldDetails[];

export interface Field {
    id: number | string;
    title: string;
    type?: FieldType;
}
export interface Question extends Field {
    description: string;
    answersType: AnswersType;
    searchedObject: boolean;
    possibleAnswersList: AnswerList;
}
export interface Answer {
    id: number | string;
    title: string;
    positiveTitle: string;
    answerType: AnswerType;
    defaultAnswer: boolean;
    skipAtResult: boolean;
    searchedObject: boolean;
    openQuestionList: QuestionList;
}
export interface SegmentField extends Field {
    state: ActiveState;
    required: boolean;
    isChanged: boolean;
    isNew: boolean;
}
export interface SegmentFieldDetails extends Omit<SegmentField, 'isChanged' | 'isNew' | 'type' | 'state'> {
    questionRequiredLinkId?: number;
}
export interface ScreenField extends Field {
    visibility: FieldVisibilityState;
    oldVisibility?: FieldVisibilityState;
    oldPosition?: number;
    isNew: boolean;
}
export interface ScreenFieldDetails extends Omit<ScreenField, 'oldVisibility' | 'oldPosition' | 'isNew' | 'type'> {
    screenQuestionLinkId?: number;
    position: number;
}

export const isQuestion = (node: unknown): node is Question => {
    return isObject(node) && hasFields<Question>(node, ['possibleAnswersList']);
};
