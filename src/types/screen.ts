import { ActiveState } from 'types/common';
import { FieldsList, ScreenFieldList, ScreenFieldDetailsList } from 'types/field';
import { VersionsList } from 'types/version';

export const enum ScreenTypes {
    Static = 'STATIC',
    Dynamic = 'DYNAMIC',
}

export type ScreenType = `${ScreenTypes}`;
export type ScreensList = Screen[];
export type DetailedScreenList = DetailedScreen[];
export type ScreenDetailsList = ScreenDetails[];

export interface Screen {
    id: number | string;
    title: string;
    description: string;
    type: ScreenType;
    state: ActiveState;
    fields: FieldsList;
    appVersions: VersionsList;
    filtered?: boolean;
}
export interface DetailedScreen extends Omit<Screen, 'fields'> {
    fields: ScreenFieldList;
    oldPosition?: number;
    oldState?: ActiveState;
    isNew: boolean;
}
export interface ScreenDetails extends Omit<Screen, 'fields' | 'filtered'> {
    segmentScreenEntrypointLinkId?: number;
    fields: ScreenFieldDetailsList;
    position: number;
}
