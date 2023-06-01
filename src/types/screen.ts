import { ActiveState } from 'types/common';
import { FieldsList } from 'types/field';
import { VersionsList } from 'types/version';

export const enum ScreenTypes {
    Static = 'STATIC',
    Dynamic = 'DYNAMIC',
}

export type ScreenType = `${ScreenTypes}`;
export type ScreensList = Screen[];

export interface Screen {
    id: number;
    title: string;
    description: string;
    type: ScreenType;
    state: ActiveState;
    fields: FieldsList;
    appVersions: VersionsList;
    filtered?: boolean;
}
