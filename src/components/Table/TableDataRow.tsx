import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SxProps, Theme } from '@mui/material/styles';

import { Column } from 'components/Table/TableHead';

const DEFAULT_ROW_HEIGHT = 65;

export interface DataConverter<T, K = unknown> {
    (key: Column<T, K>['key'], data: T): React.ReactNode;
}

export interface TableDataRowProps<T, K = unknown> {
    columns: Column<T, K>[];
    row: T;
    dataConverter: DataConverter<T, K>;
    sx?: SxProps<Theme>;
}

const TableDataRow = <T extends object, K = unknown>({
    columns,
    row,
    dataConverter,
    sx,
}: TableDataRowProps<T, K>): JSX.Element => {
    return (
        <TableRow sx={sx}>
            {columns.map(({ key, align, width }) => (
                <TableCell key={key} align={align} sx={{ width }}>
                    {dataConverter(key, row)}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default TableDataRow;
export { DEFAULT_ROW_HEIGHT };
