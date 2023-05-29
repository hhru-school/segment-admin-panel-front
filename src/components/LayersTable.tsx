import { shallowEqual } from 'react-redux';
import Link from '@mui/material/Link';

import { useAppSelector } from 'hooks/redux-hooks';
import { LayersListItem, selectLayersList, selectLayersListLoadingStatus } from 'models/layersList';

import DataTable, { Columns } from 'components/DataTable';
import LayerStatusChip from 'components/LayerStatusChip';

const columns: Columns<LayersListItem, 'details'> = [
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
    {
        key: 'details',
        headerName: '',
        align: 'right',
        sx: { width: 160 },
        valueGetter: (layer) => {
            if (layer === undefined) {
                return layer;
            }
            return (
                <Link href={`/layers/${layer.id}/info`} underline="hover">
                    Подробнее
                </Link>
            );
        },
    },
];

const LayersTable: React.FC = () => {
    const isLoading = useAppSelector(selectLayersListLoadingStatus);
    const layers = useAppSelector(selectLayersList, shallowEqual);

    return (
        <DataTable<LayersListItem, 'details'>
            columns={columns}
            rows={layers}
            emptyMessage="Нет ни одного слоя."
            loading={isLoading}
        />
    );
};

export default LayersTable;
