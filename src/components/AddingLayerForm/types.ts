import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';
import { IdMap } from 'types/common';
import { EntryPoint } from 'types/entryPoint';
import { FieldVisibilityState, ScreenFieldDetails, SegmentFieldDetails } from 'types/field';
import { LayersListItem } from 'types/layer';
import { ScreenDetails } from 'types/screen';
import { SegmentDetails } from 'types/segment';

export interface ValueWithPosition {
    id: number | string;
    position: number;
    isNew: boolean;
}
export interface NewLayer {
    title: string;
    description: string;
    parentLayer: LayersListItem | null;
    segments: SegmentInputValues | null;
}
export interface SegmentInputValue extends Omit<SegmentDetails, 'fields' | 'entryPoints' | 'description'> {
    description?: string;
    fields?: SegmentFieldInputValues;
    entryPoints?: EntryPointInputValues;
    isNew: boolean;
}
export interface SegmentFieldInputValue extends SegmentFieldDetails {
    isChanged: boolean;
    isDisabled: boolean;
    isNew: boolean;
}
export interface EntryPointInputValue extends EntryPoint {
    screens: ScreenInputValues;
}
export interface ScreenInputValue extends Omit<ScreenDetails, 'fields'> {
    fields: ScreenFieldInputValues;
    oldPosition?: number;
    isNew: boolean;
}
export interface ScreenFieldInputValue extends Omit<ScreenFieldDetails, 'id'> {
    id: number | string;
    oldVisibility?: FieldVisibilityState;
    oldPosition?: number;
    isNew: boolean;
}
export interface PagesState {
    segments: SegmentInputValues | null;
    segment: SegmentInputValue | null;
    entryPoint: EntryPointInputValue | null;
    newDynamicScreen: ScreenInputValue | null;
}

export interface RequestBodyScreen extends Omit<ScreenInputValue, 'id' | 'fields'> {
    id?: number | string;
    fields: ScreenFieldInputValue[];
}

export interface RequestBodyEntryPoint extends Omit<EntryPointInputValue, 'screens'> {
    screens: RequestBodyScreen[];
}

export interface RequestBodySegment extends Omit<SegmentInputValue, 'fields' | 'entryPoints'> {
    fields?: ScreenFieldInputValue[];
    entryPoints?: RequestBodyEntryPoint[];
}

export interface RequestBody extends Omit<NewLayer, 'segments'> {
    segments?: RequestBodySegment;
}

export type SegmentInputValues = IdMap<SegmentInputValue>;
export type SegmentFieldInputValues = IdMap<SegmentFieldInputValue>;
export type EntryPointInputValues = IdMap<EntryPointInputValue>;
export type ScreenInputValues = IdMap<ScreenInputValue>;
export type ScreenFieldInputValues = IdMap<ScreenFieldInputValue>;

const isPagesState = (value: unknown): value is PagesState => {
    return isObject(value) && hasFields<PagesState>(value, ['segments', 'segment', 'entryPoint', 'newDynamicScreen']);
};
const isSegmentInputValue = (value: unknown): value is SegmentInputValue => {
    return (
        isObject(value) && hasFields<SegmentInputValue>(value, ['id', 'title', 'activeState', 'roles', 'tags', 'isNew'])
    );
};
const isValueWithPosition = (value: unknown): value is ValueWithPosition => {
    return isObject(value) && hasFields<ValueWithPosition>(value, ['id', 'position', 'isNew']);
};

export { isPagesState, isSegmentInputValue, isValueWithPosition };
