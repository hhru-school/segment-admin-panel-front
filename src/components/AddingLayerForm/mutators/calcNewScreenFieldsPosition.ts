import { Mutator } from 'final-form';

import calcPosition from 'components/AddingLayerForm/helpers/calcPosition';
import { NewLayer, ScreenFieldInputValues } from 'components/AddingLayerForm/types';

const calcNewScreenFieldsPosition: Mutator<NewLayer> = ([name]: [string], state, { changeValue }) => {
    changeValue(state, name, (value: ScreenFieldInputValues): ScreenFieldInputValues => calcPosition(value));
};

export default calcNewScreenFieldsPosition;
