import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface DataTableEmptyRowProps {
    columnsCount: number;
    children?: React.ReactNode;
}

const DataTableEmptyRow: React.FC<DataTableEmptyRowProps> = ({ columnsCount, children }) => {
    return (
        <TableRow sx={{ height: 65 }}>
            <TableCell colSpan={columnsCount} align="center" padding="none">
                {children}
            </TableCell>
        </TableRow>
    );
};

export default DataTableEmptyRow;
