import { Mutator } from 'final-form';

import calcPosition from 'components/AddingLayerForm/helpers/calcPosition';
import { NewLayer, ScreenInputValues } from 'components/AddingLayerForm/types';
import removeKey from 'helpers/removeField';
import { IdMapKey } from 'types/common';

const removeScreen: Mutator<NewLayer> = (
    [entryPointName, screenId]: [string, number | string],
    state,
    { changeValue }
) => {
    const screenName: IdMapKey = `id-${screenId}`;

    changeValue(state, `${entryPointName}.screens`, (screens: ScreenInputValues): ScreenInputValues => {
        const newScreens = removeKey(screens, screenName);

        calcPosition(newScreens);

        return newScreens;
    });
};

export default removeScreen;
