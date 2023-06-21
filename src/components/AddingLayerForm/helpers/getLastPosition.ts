import { ValueWithPosition } from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';
import { IdMap } from 'types/common';

const getLastPosition = <T extends ValueWithPosition>(value: IdMap<T>): number => {
    let lastPosition = 0;
    idMapToArray(value).forEach(({ isNew, position }) => {
        if (!isNew) {
            lastPosition = Math.max(lastPosition, position);
        }
    });
    return lastPosition;
};

export default getLastPosition;
