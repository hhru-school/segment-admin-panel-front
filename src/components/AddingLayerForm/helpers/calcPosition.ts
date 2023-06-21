import { ValueWithPosition } from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import idMapToArray from 'helpers/idMapToArray';
import { IdMap } from 'types/common';

import getLastPosition from 'components/AddingLayerForm/helpers/getLastPosition';

const calcPosition = <T extends ValueWithPosition>(value: IdMap<T>): IdMap<T> => {
    let lastPosition = getLastPosition(value);

    return createIdMap(idMapToArray(value), (item) => {
        const { isNew } = item;

        if (isNew) {
            lastPosition += 1;
            return { ...item, position: lastPosition };
        }

        return item;
    });
};

export default calcPosition;
