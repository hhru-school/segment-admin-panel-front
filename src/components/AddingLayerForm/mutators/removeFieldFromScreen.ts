import { Mutator } from 'final-form';

import getScreenName from 'components/AddingLayerForm/helpers/getScreenName';
import getSegmentName from 'components/AddingLayerForm/helpers/getSegmentName';
import { NewLayer, ScreenFieldInputValues, SegmentFieldInputValues } from 'components/AddingLayerForm/types';
import removeKey from 'helpers/removeField';
import { IdMapKey } from 'types/common';

const removeFieldFromScreen: Mutator<NewLayer> = ([name, id]: [string, number], state, { changeValue }) => {
    const key: IdMapKey = `id-${id}`;
    changeValue(state, `${getScreenName(name)}.fields`, (value: ScreenFieldInputValues): ScreenFieldInputValues => {
        return removeKey(value, key);
    });
    changeValue(state, `${getSegmentName(name)}.fields`, (value: SegmentFieldInputValues): SegmentFieldInputValues => {
        return value[key]?.isNew ? removeKey(value, key) : value;
    });
};

export default removeFieldFromScreen;
