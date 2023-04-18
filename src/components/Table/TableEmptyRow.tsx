import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { DEFAULT_ROW_HEIGHT } from 'components/Table/TableDataRow';

interface TableEmptyRowProps {
    columnsCount: number;
    loading?: boolean;
    text?: string;
}

const TableEmptyRow: React.FC<TableEmptyRowProps> = ({ columnsCount, loading, text }) => {
    return (
        <TableRow sx={{ height: DEFAULT_ROW_HEIGHT }}>
            <TableCell colSpan={columnsCount} align="center">
                {loading ? <CircularProgress /> : text}
            </TableCell>
        </TableRow>
    );
};

export default TableEmptyRow;
