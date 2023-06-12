import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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
    valueGetter?: (data: T, searchString?: string) => React.ReactNode;
}
export type Columns<T extends object, K extends string | undefined = undefined> = Column<T, K>[];

export interface DataTableRowProps<T extends object, K extends AdditionalKey = undefined> {
    columns: Columns<T, K>;
    height: number | string;
    data?: T;
    searchString?: string;
    header?: boolean;
    collapsed?: boolean;
    collapsedDataRender?: (row: T) => React.ReactNode;
}

const DataTableRows = <T extends object, K extends AdditionalKey = undefined>({
    columns,
    data,
    searchString,
    header,
    collapsed,
    height = 65,
    collapsedDataRender,
}: DataTableRowProps<T, K>): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(!open);
    };

    const dataCells: JSX.Element[] = columns.map(({ headerName, valueGetter, field, ...rest }) => {
        if (header) {
            return <TableCell {...rest}>{headerName}</TableCell>;
        }

        if (valueGetter !== undefined && data !== undefined) {
            return <TableCell {...rest}>{valueGetter(data, searchString)}</TableCell>;
        }

        if (field && isObject(data) && hasFields(data, [field])) {
            const value = data[field];
            return <TableCell {...rest}>{(typeof value === 'string' || typeof value === 'number') && value}</TableCell>;
        }

        return <TableCell {...rest} />;
    });

    if (collapsed) {
        return (
            <>
                <TableRow sx={{ height, '& > th,td': { borderBottom: 'unset' } }}>
                    {header ? (
                        <TableCell sx={{ width: '1%', pr: 0 }}>
                            <Box sx={{ width: 30 }} />
                        </TableCell>
                    ) : (
                        <TableCell sx={{ width: '1%', pr: 0 }}>
                            <IconButton onClick={handleToggleOpen} size="small" edge="start">
                                {open ? (
                                    <KeyboardArrowUpIcon fontSize="small" />
                                ) : (
                                    <KeyboardArrowDownIcon fontSize="small" />
                                )}
                            </IconButton>
                        </TableCell>
                    )}
                    {dataCells}
                </TableRow>
                <TableRow>
                    <TableCell sx={{ width: '1%', py: 0, pr: 0 }} />
                    <TableCell sx={{ py: 0 }} colSpan={columns.length}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ pb: 2 }}>{data && collapsedDataRender && collapsedDataRender(data)}</Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }

    return <TableRow sx={{ height }}>{dataCells}</TableRow>;
};

export default DataTableRows;
