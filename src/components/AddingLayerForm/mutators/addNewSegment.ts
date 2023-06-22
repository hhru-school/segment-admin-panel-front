import { Mutator } from 'final-form';

import {
    EntryPointInputValues,
    NewLayer,
    SegmentInputValue,
    SegmentInputValues,
} from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import { ActiveStates } from 'types/common';
import { EntryPointList } from 'types/entryPoint';
import { Segment } from 'types/segment';

const normalizeEntryPoints = (entryPoints: EntryPointList): EntryPointInputValues => {
    return createIdMap(entryPoints.map((value) => ({ ...value, screens: {} })));
};

const segmentToSegmentInputValue = (
    { id, title, description, roles, tags }: Segment,
    entryPoints: EntryPointList
): SegmentInputValue => {
    return {
        id,
        title,
        description,
        roles,
        tags,
        activeState: ActiveStates.Active,
        fields: {},
        entryPoints: normalizeEntryPoints(entryPoints),
        isNew: true,
    };
};

const addNewSegment: Mutator<NewLayer> = (
    [segment, entryPoints]: [Segment, EntryPointList],
    state,
    { changeValue }
) => {
    changeValue(state, 'segments', (value: SegmentInputValues): SegmentInputValues => {
        return { ...value, [`id-${segment.id}`]: segmentToSegmentInputValue(segment, entryPoints) };
    });
};

export default addNewSegment;
