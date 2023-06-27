import { Mutator } from 'final-form';

import {
    EntryPointInputValue,
    EntryPointInputValues,
    NewLayer,
    ScreenInputValue,
    SegmentFieldInputValue,
    SegmentFieldInputValues,
} from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import idMapToArray from 'helpers/idMapToArray';
import isDisabled from 'helpers/isDisabled';
import { IdMapKey } from 'types/common';

const updateFromScreen = (
    newFields: SegmentFieldInputValues,
    previousFields: SegmentFieldInputValues,
    screen: ScreenInputValue
): SegmentFieldInputValues => {
    const disabled = isDisabled(screen.state);

    idMapToArray(screen.fields).forEach(({ id, title }) => {
        const name: IdMapKey = `id-${id}`;
        const isNew = !newFields[name];
        const hasPreviousValue = !!previousFields[name];
        if (isNew) {
            newFields[name] = hasPreviousValue
                ? { ...previousFields[name], isDisabled: disabled }
                : { id, title, required: false, isChanged: false, isDisabled: disabled, isNew };
        } else if (newFields[name].isDisabled) {
            newFields[name].isDisabled = disabled;
        }
    });

    return newFields;
};
const updateFromEntryPoint = (
    newFields: SegmentFieldInputValues,
    previousFields: SegmentFieldInputValues,
    entryPoint: EntryPointInputValue
): SegmentFieldInputValues => {
    idMapToArray(entryPoint.screens).forEach((screen) => updateFromScreen(newFields, previousFields, screen));
    return newFields;
};
const updateFromEntryPoints = (
    newFields: SegmentFieldInputValues,
    previousFields: SegmentFieldInputValues,
    entryPoints: EntryPointInputValues
): SegmentFieldInputValues => {
    idMapToArray(entryPoints).forEach((entryPoint) => updateFromEntryPoint(newFields, previousFields, entryPoint));
    return newFields;
};
const getInitialSegmentFieldsArray = (fields: SegmentFieldInputValues): SegmentFieldInputValue[] => {
    return idMapToArray(fields)
        .map((field) => ({ ...field, isDisabled: true }))
        .filter(({ isNew }) => !isNew);
};

const updateSegmentFields: Mutator<NewLayer> = ([name]: [string], state, { getIn, changeValue }) => {
    const entryPoints = getIn(state.formState.values, `${name}.entryPoints`) as EntryPointInputValues;
    const segmentFields = getIn(state.formState.values, `${name}.fields`) as SegmentFieldInputValues;
    const newSegmentFields = createIdMap(getInitialSegmentFieldsArray(segmentFields));

    changeValue(state, `${name}.fields`, () => updateFromEntryPoints(newSegmentFields, segmentFields, entryPoints));
};

export default updateSegmentFields;
