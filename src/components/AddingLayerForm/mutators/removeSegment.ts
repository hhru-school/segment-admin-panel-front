import { Mutator } from 'final-form';

import { NewLayer, SegmentInputValues } from 'components/AddingLayerForm/types';
import removeKey from 'helpers/removeField';
import { IdMapKey } from 'types/common';

const removeSegment: Mutator<NewLayer> = ([key]: [IdMapKey], state, { changeValue }) => {
    changeValue(state, 'segments', (value: SegmentInputValues): SegmentInputValues => removeKey(value, key));
};

export default removeSegment;
