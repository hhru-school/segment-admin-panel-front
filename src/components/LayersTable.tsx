import { shallowEqual } from 'react-redux';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { useAppSelector } from 'hooks/redux-hooks';
import { LayersListItem, LayersList, selectLayersList, selectLayersListLoadingStatus } from 'models/layersList';

import LayerStatusChip from 'components/LayerStatusChip';
import TableDataRow, { DataConverter, DEFAULT_ROW_HEIGHT } from 'components/Table/TableDataRow';
import TableEmptyRow from 'components/Table/TableEmptyRow';
import TableHead, { Column } from 'components/Table/TableHead';

const columns: Column<LayersListItem, 'actions'>[] = [
    {
        key: 'createTime',
        headerName: 'Создан',
        align: 'center',
        width: '180px',
    },
    {
        key: 'title',
        headerName: 'Наименование',
        align: 'center',
    },
    {
        key: 'layerStatus',
        headerName: 'Статус',
        align: 'center',
        width: '160px',
    },
    {
        key: 'id',
        headerName: 'ID',
        align: 'center',
    },
    {
        key: 'actions',
        headerName: '',
        width: '130px',
    },
];

const convertData: DataConverter<LayersListItem, 'actions'> = (key, data): React.ReactNode => {
    switch (key) {
        case 'id':
        case 'title':
            return data[key];
        case 'createTime':
            return new Date(data[key]).toLocaleString('ru', {
                dateStyle: 'short',
                timeStyle: 'medium',
            });
        case 'layerStatus':
            return <LayerStatusChip status={data[key]} variant="outlined" />;
        case 'actions':
            return (
                <Button href={`/layers/${data.id}/info`} size="small">
                    Подробнее
                </Button>
            );
    }
    return exhaustiveCheck(key);
};

const renderBody = (
    columns: Column<LayersListItem, 'actions'>[],
    rows: LayersList,
    isLoading: boolean
): React.ReactNode => {
    const columnsCount = columns.length;

    if (isLoading) {
        return <TableEmptyRow columnsCount={columnsCount} loading={isLoading} />;
    }

    if (rows.length === 0) {
        return <TableEmptyRow columnsCount={columnsCount} text="Нет ни одного слоя." />;
    }

    return rows.map((row) => (
        <TableDataRow
            key={row.id}
            columns={columns}
            row={row}
            dataConverter={convertData}
            sx={{ height: DEFAULT_ROW_HEIGHT }}
        />
    ));
};

const LayersTable: React.FC = () => {
    const layersList = useAppSelector(selectLayersList, shallowEqual);
    const isLoading = useAppSelector(selectLayersListLoadingStatus);

    return (
        <TableContainer sx={{ maxHeight: DEFAULT_ROW_HEIGHT * 9 }}>
            <Table stickyHeader>
                <TableHead columns={columns} />
                <TableBody>{renderBody(columns, layersList, isLoading)}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default LayersTable;
