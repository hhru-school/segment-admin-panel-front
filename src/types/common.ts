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
