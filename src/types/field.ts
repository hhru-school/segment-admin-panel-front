import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';

export const enum AnswerTypes {
    Positive = 'POSITIVE',
    Negative = 'NEGATIVE',
    Neutral = 'NEUTRAL',
}
export const enum QuestionTypes {
    SingleChoice = 'SINGLE_CHOICE',
    MultiSelect = 'MULTI_SELECT',
    None = 'NONE',
}

export type AnswerType = `${AnswerTypes}`;
export type QuestionType = `${QuestionTypes}`;
export type AnswerList = Answer[];
export type FieldsList = Field[];
export type QuestionList = Question[];

export interface Field {
    id: number;
    title: string;
}
export interface Question extends Field {
    description: string;
    type: QuestionType;
    searchedObject: boolean;
    answerDtoList: AnswerList;
}
export interface Answer extends Field {
    positiveTitle: string;
    answerType: AnswerType;
    answerDefault: boolean;
    skipAtResult: boolean;
    searchedObject: boolean;
    openQuestionDtoList: QuestionList;
}

export const isQuestion = (node: unknown): node is Question => {
    return isObject(node) && hasFields<Question>(node, ['answerDtoList']);
};
