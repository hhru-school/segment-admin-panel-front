import { Mutator } from 'final-form';

import { NewLayer, SegmentInputValue, SegmentInputValues } from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import { LayerSegmentsList, LayerSegmentsListItem } from 'types/segment';

const normalizeSegment = (value: LayerSegmentsListItem): SegmentInputValue => {
    const { changeState, ...rest } = value;
    return { ...rest, isNew: false };
};

const getSegmentInputValues = (segments: LayerSegmentsList): SegmentInputValues => {
    return createIdMap<LayerSegmentsListItem, SegmentInputValue>(segments, normalizeSegment);
};

const initSegments: Mutator<NewLayer> = ([value]: [LayerSegmentsList], state, { changeValue }) => {
    changeValue(state, 'segments', () => getSegmentInputValues(value));
};

export default initSegments;
