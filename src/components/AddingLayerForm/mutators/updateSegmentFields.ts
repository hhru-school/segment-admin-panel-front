import { Mutator } from 'final-form';

import {
    EntryPointInputValue,
    EntryPointInputValues,
    NewLayer,
    ScreenInputValue,
    SegmentFieldInputValues,
} from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import idMapToArray from 'helpers/idMapToArray';
import isDisabled from 'helpers/isDisabled';
import { IdMapKey } from 'types/common';

const disableSegmentFields = (fields: SegmentFieldInputValues): SegmentFieldInputValues => {
    return createIdMap(idMapToArray(fields).map((field) => ({ ...field, isDisabled: true })));
};
const updateFromScreen = (fields: SegmentFieldInputValues, screen: ScreenInputValue): SegmentFieldInputValues => {
    const disabled = isDisabled(screen.state);
    idMapToArray(screen.fields).forEach(({ id, title }) => {
        const name: IdMapKey = `id-${id}`;

        if (!fields[name]) {
            fields[name] = { id, title, required: false, isChanged: false, isDisabled: disabled, isNew: true };
        } else if (fields[name].isDisabled) {
            fields[name].isDisabled = disabled;
        }
    });

    return fields;
};
const updateFromEntryPoint = (
    fields: SegmentFieldInputValues,
    entryPoint: EntryPointInputValue
): SegmentFieldInputValues => {
    idMapToArray(entryPoint.screens).forEach((screen) => updateFromScreen(fields, screen));
    return fields;
};
const updateFromEntryPoints = (
    fields: SegmentFieldInputValues,
    entryPoints: EntryPointInputValues
): SegmentFieldInputValues => {
    idMapToArray(entryPoints).forEach((entryPoint) => updateFromEntryPoint(fields, entryPoint));
    return fields;
};

const updateSegmentFields: Mutator<NewLayer> = ([name]: [string], state, { getIn, changeValue }) => {
    const fields = getIn(state.formState.values, `${name}.fields`) as SegmentFieldInputValues;
    const newFields = disableSegmentFields(fields);
    const entryPoints = getIn(state.formState.values, `${name}.entryPoints`) as EntryPointInputValues;

    updateFromEntryPoints(newFields, entryPoints);
    changeValue(state, `${name}.fields`, () => newFields);
};

export default updateSegmentFields;
