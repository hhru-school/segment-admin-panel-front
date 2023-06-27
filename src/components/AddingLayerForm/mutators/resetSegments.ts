import { Mutator } from 'final-form';

import { NewLayer, SegmentInputValues } from 'components/AddingLayerForm/types';

const resetSegments: Mutator<NewLayer> = ([segments = null]: [SegmentInputValues | null], state, { changeValue }) => {
    changeValue(state, 'segments', () => segments);
};

export default resetSegments;
