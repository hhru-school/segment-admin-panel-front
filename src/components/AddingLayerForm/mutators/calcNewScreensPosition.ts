import { Mutator } from 'final-form';

import calcPosition from 'components/AddingLayerForm/helpers/calcPosition';
import { NewLayer, ScreenInputValues } from 'components/AddingLayerForm/types';

const calcNewScreensPosition: Mutator<NewLayer> = ([name]: [string], state, { changeValue }) => {
    changeValue(state, name, (value: ScreenInputValues): ScreenInputValues => calcPosition(value));
};

export default calcNewScreensPosition;
