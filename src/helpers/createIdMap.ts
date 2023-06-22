import { IdMap, ObjectWithId } from 'types/common';

function createIdMap<T extends ObjectWithId>(array: T[]): IdMap<T>;
function createIdMap<T extends ObjectWithId, P>(array: T[], transformer: (item: T, index: number) => P): IdMap<P>;
function createIdMap<T extends ObjectWithId, P>(array: T[], transformer?: (item: T, index: number) => P): IdMap<P | T> {
    if (transformer !== undefined) {
        return array.reduce<IdMap<P>>((map, item, index) => {
            map[`id-${item.id}`] = transformer(item, index);
            return map;
        }, {});
    }

    return array.reduce<IdMap<T>>((map, item) => {
        map[`id-${item.id}`] = item;
        return map;
    }, {});
}

export default createIdMap;
