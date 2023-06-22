import { Mutator } from 'final-form';

import { NewLayer, ScreenInputValues } from 'components/AddingLayerForm/types';
import removeKey from 'helpers/removeField';
import { IdMapKey } from 'types/common';

const removeScreen: Mutator<NewLayer> = ([name, id]: [string, number | string], state, { changeValue }) => {
    const key: IdMapKey = `id-${id}`;
    changeValue(state, `${name}.screens`, (value: ScreenInputValues): ScreenInputValues => {
        return removeKey(value, key);
    });
};

export default removeScreen;
