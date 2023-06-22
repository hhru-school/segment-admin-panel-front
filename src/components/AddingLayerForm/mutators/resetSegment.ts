import { Mutator } from 'final-form';

import { NewLayer, SegmentInputValue } from 'components/AddingLayerForm/types';

const resetSegment: Mutator<NewLayer> = ([name, segment]: [string, SegmentInputValue], state, { changeValue }) => {
    changeValue(state, name, () => segment);
};

export default resetSegment;
