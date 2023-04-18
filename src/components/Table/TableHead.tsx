import TableCell, { TableCellProps } from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface Column<T> extends Pick<TableCellProps, 'align'> {
    key: Extract<keyof T, string> | 'actions';
    headerName: string;
    width?: number | string;
}

interface TableHeadProps<T> {
    columns: Column<T>[];
}

const TableHead = <T extends object>({ columns }: TableHeadProps<T>): JSX.Element => {
    return (
        <MuiTableHead>
            <TableRow>
                {columns.map(({ key, headerName, width, align }) => (
                    <TableCell key={key} sx={{ width }} align={align}>
                        {headerName}
                    </TableCell>
                ))}
            </TableRow>
        </MuiTableHead>
    );
};

export default TableHead;
