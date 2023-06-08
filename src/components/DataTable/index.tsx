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
    const isSmall = size === 'small';
    const sx = disableDivider ? { '& th,td': { borderBottom: 'unset' } } : undefined;

    if (loading) {
        return (
            <TableContainer>
                <Table size={size} sx={sx} stickyHeader>
                    <TableHead>
                        <DataTableRows columns={columns} collapsed={isCollapsed} header small={isSmall} />
                    </TableHead>
                    <TableBody>
                        <DataTableEmptyRow
                            columnsCount={isCollapsed ? columns.length + 1 : columns.length}
                            small={isSmall}
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
            <TableContainer>
                <Table size={size} sx={sx} stickyHeader>
                    <TableHead>
                        <DataTableRows columns={columns} collapsed={isCollapsed} header small={isSmall} />
                    </TableHead>
                    <TableBody>
                        {isEmpty(searchString) ? (
                            <DataTableEmptyRow
                                columnsCount={isCollapsed ? columns.length + 1 : columns.length}
                                small={isSmall}
                            >
                                <Alert severity="info" sx={{ justifyContent: 'center', my: 1 }}>
                                    {emptyMessage || 'Ничего нет.'}
                                </Alert>
                            </DataTableEmptyRow>
                        ) : (
                            <DataTableEmptyRow
                                columnsCount={isCollapsed ? columns.length + 1 : columns.length}
                                small={isSmall}
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
        <TableContainer>
            <Table size={size} sx={sx} stickyHeader>
                <TableHead>
                    <DataTableRows columns={columns} collapsed={isCollapsed} header small={isSmall} />
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
                            small={isSmall}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
export type { Columns };
