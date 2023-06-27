import { ValueWithPosition } from 'components/AddingLayerForm/types';
import getIdMapKeys from 'helpers/getIdMapKeys';
import { IdMap } from 'types/common';

import getLastPosition from 'components/AddingLayerForm/helpers/getLastPosition';

const calcPosition = <T extends ValueWithPosition>(value: IdMap<T>): IdMap<T> => {
    let lastPosition = getLastPosition(value);

    getIdMapKeys(value).forEach((key) => {
        if (value[key].isNew) {
            lastPosition += 1;
            value[key].position = lastPosition;
        }
    });

    return value;
};

export default calcPosition;
