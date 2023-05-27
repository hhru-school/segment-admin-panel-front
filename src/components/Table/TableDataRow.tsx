import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SxProps, Theme } from '@mui/material/styles';

import { Column } from 'components/Table/TableHead';

const DEFAULT_ROW_HEIGHT = 65;

export interface DataRender<T, K = unknown, A = () => void> {
    (key: Column<T, K>['key'], data: T, actions?: A): React.ReactNode;
}

export interface TableDataRowProps<T, K = unknown, A = () => void> {
    columns: Column<T, K>[];
    row: T;
    dataRender: DataRender<T, K, A>;
    action?: A;
    sx?: SxProps<Theme>;
}

const TableDataRow = <T extends object, K = unknown>({
    columns,
    row,
    dataRender,
    action,
    sx,
}: TableDataRowProps<T, K>): JSX.Element => {
    return (
        <TableRow sx={sx}>
            {columns.map(({ key, align, width }) => (
                <TableCell key={key} align={align} sx={{ width }}>
                    {dataRender(key, row, action)}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default TableDataRow;
export { DEFAULT_ROW_HEIGHT };
