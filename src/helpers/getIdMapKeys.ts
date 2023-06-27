import { IdMap, IdMapKey } from 'types/common';

const getIdMapKeys = <T>(value: IdMap<T>): IdMapKey[] => {
    return Object.keys(value) as IdMapKey[];
};

export default getIdMapKeys;
