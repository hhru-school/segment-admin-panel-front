import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';

const ANSWER_TYPES = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'] as const;
const QUESTION_TYPES = ['SINGLE_CHOICE', 'MULTI_SELECT', 'NONE'] as const;

export type AnswerType = (typeof ANSWER_TYPES)[number];
export type QuestionType = (typeof QUESTION_TYPES)[number];
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
