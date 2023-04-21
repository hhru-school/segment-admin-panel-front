import TableCell, { TableCellProps } from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface Column<T, K = unknown> extends Pick<TableCellProps, 'align'> {
    key: K extends string ? Extract<keyof T, string> | K : Extract<keyof T, string>;
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
