export const enum LayerStatuses {
    Archived = 'ARCHIVED',
    Experimental = 'EXPERIMENTAL',
    Stable = 'STABLE',
}

export type LayerStatus = `${LayerStatuses}`;
export type LayersListItem = Pick<Layer, 'id' | 'title' | 'createTime' | 'layerStatus'>;
export type LayersList = LayersListItem[];

export interface Layer {
    id: number;
    title: string;
    description: string;
    createTime: string;
    layerStatus: LayerStatus;
    parentLayersList: LayersList;
}
