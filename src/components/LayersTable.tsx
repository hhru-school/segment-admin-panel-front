import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { LayersListItem, fetchLayersList, selectLayersList } from 'models/layersList';

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
    {
        key: 'actions',
        headerName: '',
        width: '130px',
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
            return <LayerStatusChip status={data[key]} />;
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
    columns: Column<LayersListItem>[],
    rows: LayersListItem[] | null,
    isLoading: boolean
): React.ReactNode => {
    const columnsCount = columns.length;

    if (isLoading) {
        return <TableEmptyRow columnsCount={columnsCount} loading={isLoading} />;
    }

    if (rows == null || rows.length === 0) {
        return <TableEmptyRow columnsCount={columnsCount} text="Нет ни одного слоя." />;
    }

    return rows.map((row) => <TableDataRow key={row.id} columns={columns} row={row} dataConverter={convertData} />);
};

const LayersTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, isLoading, error } = useAppSelector(selectLayersList, shallowEqual);
    const { setAlert } = useErrorAlert();

    // нужно для теста сообщения (потом удалить)
    const test = () => {
        void dispatch(fetchLayersList());
    };

    useEffect(() => {
        if (items == null) {
            void dispatch(fetchLayersList());
        }
    }, [items, dispatch]);

    useEffect(() => {
        if (error != null) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    return (
        <Paper sx={{ p: { sm: 4, md: 6 } }}>
            <Box sx={{ pb: 4, pl: 4, pr: 2 }}>
                <Typography component="h2" variant="h4">
                    Слои
                </Typography>
                <Box sx={{ ml: 'auto', width: 'max-content' }}>
                    <Button startIcon={<AddIcon />} variant="contained" onClick={test}>
                        Создать новый слой
                    </Button>
                </Box>
            </Box>
            <TableContainer sx={{ maxHeight: DEFAULT_ROW_HEIGHT * 9 }}>
                <Table stickyHeader>
                    <TableHead columns={columns} />
                    <TableBody>{renderBody(columns, items, isLoading)}</TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default LayersTable;
