import { shallowEqual } from 'react-redux';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayerParentLayers } from 'models/currentLayer';
import { LayersListItem } from 'types/layer';

import DataTable, { Columns } from 'components/DataTable';
import LayerStatusChip from 'components/LayerStatusChip';

const columns: Columns<LayersListItem> = [
    {
        key: 'title',
        field: 'title',
        headerName: 'Наименование',
        align: 'left',
        sx: { width: 350 },
    },
    {
        key: 'createTime',
        field: 'createTime',
        headerName: 'Создан',
        align: 'center',
        sx: { width: 200 },
        valueGetter: (layer) => {
            if (layer === undefined) {
                return layer;
            }
            return new Date(layer.createTime).toLocaleString('ru', {
                dateStyle: 'short',
                timeStyle: 'medium',
            });
        },
    },
    {
        key: 'layerStatus',
        field: 'layerStatus',
        headerName: 'Статус',
        align: 'center',
        sx: { width: 300 },
        valueGetter: (layer) => {
            if (layer === undefined) {
                return layer;
            }
            return <LayerStatusChip status={layer.layerStatus} variant="outlined" />;
        },
    },
    {
        key: 'id',
        field: 'id',
        headerName: 'ID',
        align: 'center',
        sx: { width: 100 },
    },
];

const ParentsLayersTable: React.FC = () => {
    const parentLayers = useAppSelector(selectCurrentLayerParentLayers, shallowEqual);

    return (
        <DataTable<LayersListItem> columns={columns} rows={parentLayers || []} emptyMessage="Родительского слоя нет." />
    );
};

export default ParentsLayersTable;
