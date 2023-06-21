import { DetailedScreenList, ScreenDetailsList } from 'types/screen';

export interface EntryPoint {
    id: number | string;
    title: string;
    description: string;
}
export interface SegmentEntryPoint extends EntryPoint {
    screens: DetailedScreenList;
}
export interface EntryPointDetails extends EntryPoint {
    screens: ScreenDetailsList;
}

export type EntryPointList = EntryPoint[];
export type SegmentEntryPointList = SegmentEntryPoint[];
export type EntryPointDetailsList = EntryPointDetails[];
