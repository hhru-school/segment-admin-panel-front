import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';

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

export type AnswerType = `${AnswerTypes}`;
export type AnswersType = `${AnswersTypes}`;
export type FieldType = `${FieldTypes}`;
export type AnswerList = Answer[];
export type FieldsList = Field[];
export type QuestionList = Question[];

export interface Field {
    id: number;
    title: string;
    type: FieldType;
}
export interface Question extends Field {
    description: string;
    answersType: AnswersType;
    searchedObject: boolean;
    possibleAnswersList: AnswerList;
}
export interface Answer {
    id: number;
    title: string;
    positiveTitle: string;
    answerType: AnswerType;
    defaultAnswer: boolean;
    skipAtResult: boolean;
    searchedObject: boolean;
    openQuestionList: QuestionList;
}

export const isQuestion = (node: unknown): node is Question => {
    return isObject(node) && hasFields<Question>(node, ['possibleAnswersList']);
};
