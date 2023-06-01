import { ChangeState, ActiveState } from 'types/common';
import { Segment } from 'types/segment';

export const enum LayerStatuses {
    Archived = 'ARCHIVED',
    Experimental = 'EXPERIMENTAL',
    Stable = 'STABLE',
}

export type LayerStatus = `${LayerStatuses}`;
export type LayersListItem = Pick<Layer, 'id' | 'title' | 'createTime' | 'layerStatus'>;
export type LayersList = LayersListItem[];
export type LayerSegmentsList = LayerSegmentsListItem[];

export interface Layer {
    id: number;
    title: string;
    description: string;
    createTime: string;
    layerStatus: LayerStatus;
    parentLayersList: LayersList;
}
export interface LayerSegmentsListItem extends Omit<Segment, 'description' | 'parentSegment' | 'createTime'> {
    changeState: ChangeState;
    activeState: ActiveState;
}
export interface LayerSegments extends Pick<Layer, 'id' | 'title'> {
    segments: LayerSegmentsList;
}
