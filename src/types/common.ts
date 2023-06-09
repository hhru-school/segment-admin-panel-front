export const enum ChangeStates {
    NotChanged = 'NOT_CHANGED',
    Changed = 'CHANGED',
    New = 'NEW',
}
export const enum ActiveStates {
    Active = 'ACTIVE',
    Disabled = 'DISABLED',
}

export type ChangeState = `${ChangeStates}`;
export type ActiveState = `${ActiveStates}`;
export type FormError<V> = Partial<Record<keyof V, string>>;
export type IdMapKey = `id-${number | string}`;

export interface ObjectWithId {
    id: number | string;
}
export interface IdMap<T> {
    [key: IdMapKey]: T;
}
