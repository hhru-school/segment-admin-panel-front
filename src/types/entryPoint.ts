import { DetailedScreenList } from 'types/screen';

export interface EntryPoint {
    id: number;
    title: string;
    description: string;
}
export interface SegmentEntryPoint extends EntryPoint {
    screens: DetailedScreenList;
}

export type EntryPointList = EntryPoint[];
export type SegmentEntryPointList = SegmentEntryPoint[];
