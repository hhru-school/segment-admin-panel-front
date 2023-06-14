import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import isEmpty from 'helpers/isEmpty';

import DataTableEmptyRow from 'components/DataTable/DataTableEmptyRow';
import DataTableRows, { Columns, AdditionalKey, DataTableRowProps } from 'components/DataTable/DataTableRows';

interface DataTableProps<T extends object, K extends AdditionalKey = undefined>
    extends Pick<DataTableRowProps<T, K>, 'collapsedDataRender'>,
        Pick<TableProps, 'size'> {
    columns: Columns<T, K>;
    rows: T[];
    maxDisplayRows?: number;
    searchString?: string;
    emptyMessage?: string;
    searchEmptyMessage?: string;
    loading?: boolean;
    skeletonHeight?: string | number;
    disableDivider?: boolean;
}

const DataTable = <T extends { id: number }, K extends AdditionalKey = undefined>({
    columns,
    rows,
    maxDisplayRows,
    collapsedDataRender,
    searchString = '',
    searchEmptyMessage,
    emptyMessage,
    size,
    loading,
    skeletonHeight = size === 'small' ? 50 * 3 : 65 * 3,
    disableDivider,
}: DataTableProps<T, K>): JSX.Element => {
    const isCollapsed = collapsedDataRender !== undefined;
    const sx = disableDivider ? { '& th,td': { borderBottom: 'unset' } } : undefined;
    const rowHeight = size === 'small' ? 50 : 65;
    const maxHeight = maxDisplayRows && maxDisplayRows > 0 ? (maxDisplayRows + 1) * rowHeight : undefined;

    if (loading) {
        return (
            <TableContainer sx={{ maxHeight }}>
                <Table size={size} sx={sx} stickyHeader>
                    <TableHead>
                        <DataTableRows columns={columns} collapsed={isCollapsed} header height={rowHeight} />
                    </TableHead>
                    <TableBody>
                        <DataTableEmptyRow
                            columnsCount={isCollapsed ? columns.length + 1 : columns.length}
                            height={rowHeight}
                        >
                            <Skeleton variant="rectangular" height={skeletonHeight} />
                        </DataTableEmptyRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    if (isEmpty(rows)) {
        return (
            <TableContainer sx={{ maxHeight }}>
                <Table size={size} sx={sx} stickyHeader>
                    <TableHead>
                        <DataTableRows columns={columns} collapsed={isCollapsed} header height={rowHeight} />
                    </TableHead>
                    <TableBody>
                        {isEmpty(searchString) ? (
                            <DataTableEmptyRow
                                columnsCount={isCollapsed ? columns.length + 1 : columns.length}
                                height={rowHeight}
                            >
                                <Alert severity="info" sx={{ justifyContent: 'center', my: 1 }}>
                                    {emptyMessage || 'Ничего нет.'}
                                </Alert>
                            </DataTableEmptyRow>
                        ) : (
                            <DataTableEmptyRow
                                columnsCount={isCollapsed ? columns.length + 1 : columns.length}
                                height={rowHeight}
                            >
                                <Alert severity="info" sx={{ justifyContent: 'center', my: 1 }}>
                                    {searchEmptyMessage || 'Ничего не найдено.'}
                                </Alert>
                            </DataTableEmptyRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <TableContainer sx={{ maxHeight }}>
            <Table size={size} sx={sx} stickyHeader>
                <TableHead>
                    <DataTableRows columns={columns} collapsed={isCollapsed} header height={rowHeight} />
                </TableHead>
                <TableBody>
                    {rows.map((data) => (
                        <DataTableRows
                            key={data.id}
                            data={data}
                            columns={columns}
                            searchString={searchString}
                            collapsed={isCollapsed}
                            collapsedDataRender={collapsedDataRender}
                            height={rowHeight}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
export type { Columns };
