import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import hasFields from 'helpers/hasFields';
import isObject from 'helpers/isObject';

type ExtractKey<T extends object> = Extract<keyof T, string | number>;

export type AdditionalKey = string | undefined;

interface Column<T extends object, K extends AdditionalKey = undefined> extends Pick<TableCellProps, 'align' | 'sx'> {
    key: K extends string ? ExtractKey<T> | K : ExtractKey<T>;
    field?: keyof T;
    headerName?: string;
    valueGetter?: (data?: T, searchString?: string) => React.ReactNode;
}
export type Columns<T extends object, K extends string | undefined = undefined> = Column<T, K>[];

interface DataTableRowProps<T extends object, K extends AdditionalKey = undefined> {
    columns: Columns<T, K>;
    data?: T;
    searchString?: string;
    header?: boolean;
}

const DataTableRows = <T extends object, K extends AdditionalKey = undefined>({
    columns,
    data,
    searchString,
    header,
}: DataTableRowProps<T, K>): JSX.Element => {
    return (
        <TableRow sx={{ height: 65 }}>
            {columns.map(({ headerName, valueGetter, field, ...rest }) => {
                if (header) {
                    return <TableCell {...rest}>{headerName}</TableCell>;
                }

                if (valueGetter !== undefined) {
                    return <TableCell {...rest}>{valueGetter(data, searchString)}</TableCell>;
                }

                if (field && isObject(data) && hasFields(data, [field])) {
                    const value = data[field];
                    return (
                        <TableCell {...rest}>
                            {(typeof value === 'string' || typeof value === 'number') && value}
                        </TableCell>
                    );
                }

                return <TableCell {...rest} />;
            })}
        </TableRow>
    );
};

export default DataTableRows;
