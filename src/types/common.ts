const CHANGE_STATES = ['NOT_CHANGED', 'CHANGED', 'NEW'] as const;
const ACTIVE_STATES = ['ACTIVE', 'DISABLED'] as const;

export type ChangeState = (typeof CHANGE_STATES)[number];
export type ActiveState = (typeof ACTIVE_STATES)[number];
