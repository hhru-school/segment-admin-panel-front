import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface DataTableEmptyRowProps {
    columnsCount: number;
    children?: React.ReactNode;
    small?: boolean;
}

const DataTableEmptyRow: React.FC<DataTableEmptyRowProps> = ({ columnsCount, children, small }) => {
    const height = small ? 50 : 65;

    return (
        <TableRow sx={{ height }}>
            <TableCell colSpan={columnsCount} align="center" padding="none">
                {children}
            </TableCell>
        </TableRow>
    );
};

export default DataTableEmptyRow;
