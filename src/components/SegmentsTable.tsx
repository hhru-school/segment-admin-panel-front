import { shallowEqual } from 'react-redux';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import { Segment, SegmentsList, selectSegments, selectSegmentsLoadingStatus } from 'models/segments';

import TableDataRow, { DataRender, DEFAULT_ROW_HEIGHT } from 'components/Table/TableDataRow';
import TableEmptyRow from 'components/Table/TableEmptyRow';
import TableHead, { Column } from 'components/Table/TableHead';

const columns: Column<Segment, 'actions'>[] = [
    {
        key: 'title',
        headerName: 'Наименование',
        align: 'left',
        width: '40%',
    },
    {
        key: 'createTime',
        headerName: 'Создан',
        align: 'center',
        width: '30%',
    },
    {
        key: 'actions',
        headerName: '',
        align: 'right',
        width: '30%',
    },
];

const renderData: DataRender<Segment, 'actions'> = (key, data): React.ReactNode => {
    switch (key) {
        case 'id':
        case 'parentSegment':
        case 'description':
        case 'roles':
        case 'tags':
            return null;
        case 'title':
            return data[key];
        case 'createTime':
            return new Date(data[key]).toLocaleString('ru', {
                dateStyle: 'short',
                timeStyle: 'medium',
            });
        case 'actions':
            return (
                <Button href={`/segments/${data.id}`} size="small">
                    Подробнее
                </Button>
            );
    }
    return exhaustiveCheck(key);
};

const renderBody = (columns: Column<Segment, 'actions'>[], rows: SegmentsList, isLoading: boolean): React.ReactNode => {
    const columnsCount = columns.length;

    if (isLoading) {
        return (
            <>
                {Array(7)
                    .fill(0)
                    .map((_, index) => (
                        <TableEmptyRow key={index} columnsCount={columnsCount} loading={isLoading} />
                    ))}
            </>
        );
    }

    if (isEmpty(rows)) {
        return <TableEmptyRow columnsCount={columnsCount} text="Нет ни одного сегмента." />;
    }

    return rows.map((row) => (
        <TableDataRow
            key={row.id}
            columns={columns}
            row={row}
            dataRender={renderData}
            sx={{ height: DEFAULT_ROW_HEIGHT }}
        />
    ));
};

const SegmentsTable: React.FC = () => {
    const isLoading = useAppSelector(selectSegmentsLoadingStatus);
    const segments = useAppSelector(selectSegments, shallowEqual);

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead columns={columns} />
                <TableBody>{renderBody(columns, segments, isLoading)}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default SegmentsTable;
