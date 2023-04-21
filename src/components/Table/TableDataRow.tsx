import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Column } from 'components/Table/TableHead';

const DEFAULT_ROW_HEIGHT = 65;

export interface DataConverter<T, K = unknown> {
    (key: Column<T, K>['key'], data: T): React.ReactNode;
}

interface TableDataRowProps<T, K = unknown> {
    columns: Column<T, K>[];
    row: T;
    dataConverter: DataConverter<T, K>;
}

const TableDataRow = <T extends object, K = unknown>({
    columns,
    row,
    dataConverter,
}: TableDataRowProps<T, K>): JSX.Element => {
    return (
        <TableRow sx={{ height: DEFAULT_ROW_HEIGHT }}>
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
