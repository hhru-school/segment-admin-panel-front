import { shallowEqual } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayerParentLayers } from 'models/currentLayer';
import { LayersListItem, LayersList } from 'models/layersList';

import LayerStatusChip from 'components/LayerStatusChip';
import TableDataRow, { DataConverter, DEFAULT_ROW_HEIGHT } from 'components/Table/TableDataRow';
import TableEmptyRow from 'components/Table/TableEmptyRow';
import TableHead, { Column } from 'components/Table/TableHead';

const columns: Column<LayersListItem>[] = [
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
];

const convertData: DataConverter<LayersListItem> = (key, data): React.ReactNode => {
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
    }
    return exhaustiveCheck(key);
};

const renderBody = (columns: Column<LayersListItem>[], rows: LayersList | null): React.ReactNode => {
    if (rows == null || rows.length === 0) {
        return <TableEmptyRow columnsCount={columns.length} text="Родительского слоя нет." />;
    }

    return rows.map((row) => <TableDataRow key={row.id} columns={columns} row={row} dataConverter={convertData} />);
};

const LayersTable: React.FC = () => {
    const items = useAppSelector(selectCurrentLayerParentLayers, shallowEqual);

    return (
        <TableContainer sx={{ maxHeight: DEFAULT_ROW_HEIGHT * 4 }}>
            <Table stickyHeader>
                <TableHead columns={columns} />
                <TableBody>{renderBody(columns, items)}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default LayersTable;
