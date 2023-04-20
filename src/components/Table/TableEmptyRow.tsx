import Skeleton from '@mui/material/Skeleton';
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
            {loading ? (
                <TableCell colSpan={columnsCount} padding="none">
                    <Skeleton variant="rectangular" height={DEFAULT_ROW_HEIGHT} />
                </TableCell>
            ) : (
                <TableCell colSpan={columnsCount} align="center">
                    {text}
                </TableCell>
            )}
        </TableRow>
    );
};

export default TableEmptyRow;
