import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import QuestionVisibilityElement from 'components/QuestionStatus/QuestionVisibilityElement';
import TableDataRow, { DataRender } from 'components/Table/TableDataRow';
import TableHead, { Column } from 'components/Table/TableHead';
import exhaustiveCheck from 'helpers/exhaustiveCheck';

interface QuestionVisibility {
    title: string;
    visibilityStatus: 'SHOW' | 'HIDE' | 'HIDE_PREFILLED';
}

const columns: Column<QuestionVisibility>[] = [
    { key: 'title', headerName: 'Точка входа' },
    { key: 'visibilityStatus', headerName: 'Видимость', align: 'center', width: 140 },
];

interface QuestionVisibilityTableProps {
    rows: QuestionVisibility[];
}

const renderData: DataRender<QuestionVisibility> = (key, data): React.ReactNode => {
    switch (key) {
        case 'title':
            return data[key];
        case 'visibilityStatus':
            return <QuestionVisibilityElement value={data[key]} previousValue="HIDE_PREFILLED" />;
    }
    return exhaustiveCheck(key);
};

const QuestionVisibilityTable: React.FC<QuestionVisibilityTableProps> = ({ rows }) => {
    return (
        <Table size="small">
            <TableHead columns={columns} />
            <TableBody>
                {rows.map((row) => (
                    <TableDataRow
                        key={row.title}
                        columns={columns}
                        row={row}
                        dataRender={renderData}
                        sx={{ '&:last-child > td': { borderBottom: 'unset' } }}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default QuestionVisibilityTable;
