export const enum LayerStates {
    Archived = 'ARCHIVED',
    Experimental = 'EXPERIMENTAL',
    Stable = 'STABLE',
}

export type LayerState = `${LayerStates}`;
export type LayersListItem = Pick<Layer, 'id' | 'title' | 'createTime' | 'layerStatus'>;
export type LayersList = LayersListItem[];

export interface Layer {
    id: number | string;
    title: string;
    description: string;
    createTime: string;
    layerStatus: LayerState;
    parentLayersList: LayersList;
}
