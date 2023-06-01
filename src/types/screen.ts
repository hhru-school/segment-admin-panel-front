import { FieldsList } from 'types/field';
import { VersionsList } from 'types/version';

const SCREEN_TYPES = ['STATIC', 'DYNAMIC'] as const;
const SCREEN_STATES = ['ACTIVE', 'ARCHIVED'] as const;

export type ScreenType = (typeof SCREEN_TYPES)[number];
export type ScreenState = (typeof SCREEN_STATES)[number];
export type ScreensList = Screen[];

export interface Screen {
    id: number;
    title: string;
    description: string;
    type: ScreenType;
    state: ScreenState;
    fields: FieldsList;
    appVersions: VersionsList;
    filtered?: boolean;
}
