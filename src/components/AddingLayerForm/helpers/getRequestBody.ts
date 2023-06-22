import {
    EntryPointInputValue,
    NewLayer,
    ScreenFieldInputValue,
    ScreenInputValue,
    SegmentFieldInputValue,
    SegmentInputValue,
} from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';
import { ScreenTypes } from 'types/screen';

export interface RequestBodyScreen extends Omit<ScreenInputValue, 'id' | 'fields'> {
    id?: number | string;
    fields: ScreenFieldInputValue[];
}

export interface RequestBodyEntryPoint extends Omit<EntryPointInputValue, 'screens'> {
    screens: RequestBodyScreen[];
}

export interface RequestBodySegment extends Omit<SegmentInputValue, 'fields' | 'entryPoints'> {
    fields?: SegmentFieldInputValue[];
    entryPoints?: RequestBodyEntryPoint[];
}

export interface RequestBody extends Omit<NewLayer, 'segments'> {
    segments?: RequestBodySegment[];
}

const screenToRequestScreen = (value: ScreenInputValue): RequestBodyScreen => {
    if (value.isNew && value.type === ScreenTypes.Dynamic) {
        const { id, fields, ...rest } = value;
        return { ...rest, fields: idMapToArray(fields) };
    }

    return { ...value, fields: idMapToArray(value.fields) };
};

const entryPointToRequestEntryPoint = (value: EntryPointInputValue): RequestBodyEntryPoint => {
    const { screens } = value;
    return { ...value, screens: idMapToArray(screens).map(screenToRequestScreen) };
};

const segmentToRequestSegment = (value: SegmentInputValue): RequestBodySegment => {
    const { fields, entryPoints } = value;
    return {
        ...value,
        fields: fields ? idMapToArray(fields) : [],
        entryPoints: entryPoints ? idMapToArray(entryPoints).map(entryPointToRequestEntryPoint) : [],
    };
};

const getRequestBody = (value: NewLayer): RequestBody => {
    const { segments } = value;
    return { ...value, segments: segments ? idMapToArray(segments).map(segmentToRequestSegment) : [] };
};

export default getRequestBody;
