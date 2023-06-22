import { Mutator } from 'final-form';

import { NewLayer } from 'components/AddingLayerForm/types';

const resetSegments: Mutator<NewLayer> = (_, state, { changeValue }) => {
    changeValue(state, 'segments', () => null);
};

export default resetSegments;
