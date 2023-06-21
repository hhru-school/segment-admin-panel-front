import { IdMap } from 'types/common';

const idMapToArray = <T>(idMap: IdMap<T>): T[] => {
    return Object.values(idMap) as Array<T>;
};

export default idMapToArray;
