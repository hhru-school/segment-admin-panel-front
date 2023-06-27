import { Mutator } from 'final-form';

import calcPosition from 'components/AddingLayerForm/helpers/calcPosition';
import getScreenName from 'components/AddingLayerForm/helpers/getScreenName';
import { NewLayer, ScreenFieldInputValues } from 'components/AddingLayerForm/types';
import removeKey from 'helpers/removeField';
import { IdMapKey } from 'types/common';

const removeFieldFromScreen: Mutator<NewLayer> = ([name, id]: [string, number], state, { changeValue }) => {
    const fieldName: IdMapKey = `id-${id}`;

    changeValue(
        state,
        `${getScreenName(name)}.fields`,
        (screenFields: ScreenFieldInputValues): ScreenFieldInputValues => {
            const newScreenFields = removeKey(screenFields, fieldName);

            calcPosition(newScreenFields);

            return newScreenFields;
        }
    );
};

export default removeFieldFromScreen;
