import { Mutator } from 'final-form';

import {
    EntryPointInputValue,
    NewLayer,
    ScreenFieldInputValue,
    ScreenInputValue,
    SegmentFieldInputValue,
    SegmentFieldInputValues,
    SegmentInputValue,
    SegmentInputValues,
} from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import isActive from 'helpers/isActive';
import { IdMapKey } from 'types/common';
import { EntryPointDetails } from 'types/entryPoint';
import { ScreenFieldDetails, SegmentFieldDetails } from 'types/field';
import { ScreenDetails } from 'types/screen';
import { SegmentDetails } from 'types/segment';

const normalizeScreenField = (value: ScreenFieldDetails): ScreenFieldInputValue => {
    const { position, visibility } = value;
    return { ...value, isNew: false, oldPosition: position, oldVisibility: visibility };
};
const normalizeSegmentField = (value: SegmentFieldDetails): SegmentFieldInputValue => {
    return { ...value, isChanged: false, isDisabled: true, isNew: false };
};
const normalizeScreen = (value: ScreenDetails, segmentFields: SegmentFieldInputValues): ScreenInputValue => {
    const { fields, position, state } = value;
    const active = isActive(state);

    if (active) {
        fields.forEach(({ id }) => {
            const name: IdMapKey = `id-${id}`;
            if (segmentFields[name]) {
                segmentFields[name].isDisabled = false;
            }
        });
    }

    return {
        ...value,
        fields: createIdMap<ScreenFieldDetails, ScreenFieldInputValue>(fields, normalizeScreenField),
        isNew: false,
        oldPosition: position,
    };
};
const normalizeEntryPoint = (
    value: EntryPointDetails,
    segmentFields: SegmentFieldInputValues
): EntryPointInputValue => {
    const { screens } = value;
    return {
        ...value,
        screens: createIdMap<ScreenDetails, ScreenInputValue>(screens, (screen) =>
            normalizeScreen(screen, segmentFields)
        ),
    };
};
const getSegmentDetails = (
    value: SegmentDetails
): Pick<SegmentInputValue, 'description' | 'fields' | 'entryPoints'> => {
    const { description, fields: initialFields, entryPoints: initialEntryPoints } = value;
    const fields = createIdMap<SegmentFieldDetails, SegmentFieldInputValue>(initialFields, normalizeSegmentField);
    const entryPoints = createIdMap<EntryPointDetails, EntryPointInputValue>(initialEntryPoints, (entryPoint) =>
        normalizeEntryPoint(entryPoint, fields)
    );

    return {
        description,
        fields,
        entryPoints,
    };
};

const initSegmentDetails: Mutator<NewLayer> = (
    [segmentName, value]: [keyof SegmentInputValues, SegmentDetails],
    state,
    { changeValue }
) => {
    changeValue(state, `segments.${segmentName}`, (segment: SegmentInputValue) => ({
        ...segment,
        ...getSegmentDetails(value),
    }));
};

export default initSegmentDetails;
