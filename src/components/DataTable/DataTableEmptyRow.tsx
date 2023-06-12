import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface DataTableEmptyRowProps {
    columnsCount: number;
    height: number | string;
    children?: React.ReactNode;
}

const DataTableEmptyRow: React.FC<DataTableEmptyRowProps> = ({ columnsCount, children, height = 65 }) => {
    return (
        <TableRow sx={{ height }}>
            <TableCell colSpan={columnsCount} align="center" padding="none">
                {children}
            </TableCell>
        </TableRow>
    );
};

export default DataTableEmptyRow;
