import { ChangeState, ActiveState } from 'types/common';
import { EntryPointDetailsList, SegmentEntryPointList } from 'types/entryPoint';
import { SegmentFieldList, SegmentFieldDetailsList } from 'types/field';
import { Layer } from 'types/layer';
import { RolesList } from 'types/role';

export interface Segment {
    id: number | string;
    title: string;
    description: string;
    parentSegment: Pick<Segment, 'id' | 'title'> | null;
    createTime: string;
    roles: RolesList;
    tags: string[];
}
export interface LayerSegmentsListItem extends Omit<Segment, 'description' | 'parentSegment' | 'createTime'> {
    segmentStateLinkId: number;
    changeState: ChangeState;
    activeState: ActiveState;
}
export interface LayerSegments extends Pick<Layer, 'id' | 'title'> {
    segments: LayerSegmentsList;
}
export interface LayerSegment extends Pick<Segment, 'title' | 'description' | 'roles' | 'tags'> {
    layerId: number;
    layerTitle: string;
    segmentId: number;
    activeState: ActiveState;
    oldActiveState: ActiveState;
    fields: SegmentFieldList;
    entryPoints: SegmentEntryPointList;
}
export interface SegmentDetails extends Omit<Segment, 'parentSegment' | 'createTime'> {
    segmentStateLinkId?: number;
    activeState: ActiveState;
    fields: SegmentFieldDetailsList;
    entryPoints: EntryPointDetailsList;
}

export type SegmentsList = Segment[];
export type LayerSegmentsList = LayerSegmentsListItem[];
export type SegmentDetailsList = SegmentDetails[];
