import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import isEmpty from 'helpers/isEmpty';

import DataTableEmptyRow from 'components/DataTable/DataTableEmptyRow';
import DataTableRows, { Columns, AdditionalKey, DataTableRowProps } from 'components/DataTable/DataTableRows';

interface DataTableProps<T extends object, K extends AdditionalKey = undefined>
    extends Pick<DataTableRowProps<T, K>, 'collapsedDataRender'> {
    columns: Columns<T, K>;
    rows: T[];
    searchString?: string;
    emptyMessage?: string;
    searchEmptyMessage?: string;
    loading?: boolean;
    skeletonHeight?: string | number;
}

const DataTable = <T extends { id: number }, K extends AdditionalKey = undefined>({
    columns,
    rows,
    collapsedDataRender,
    searchString = '',
    searchEmptyMessage,
    emptyMessage,
    loading,
    skeletonHeight = 65 * 3,
}: DataTableProps<T, K>): JSX.Element => {
    const isCollapsed = collapsedDataRender !== undefined;

    if (loading) {
        return (
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <DataTableRows columns={columns} collapsed={isCollapsed} header />
                    </TableHead>
                    <TableBody>
                        <DataTableEmptyRow columnsCount={isCollapsed ? columns.length + 1 : columns.length}>
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
                <Table stickyHeader>
                    <TableHead>
                        <DataTableRows columns={columns} collapsed={isCollapsed} header />
                    </TableHead>
                    <TableBody>
                        {isEmpty(searchString) ? (
                            <DataTableEmptyRow columnsCount={isCollapsed ? columns.length + 1 : columns.length}>
                                <Alert severity="info" sx={{ justifyContent: 'center', my: 1 }}>
                                    {emptyMessage || 'Ничего нет.'}
                                </Alert>
                            </DataTableEmptyRow>
                        ) : (
                            <DataTableEmptyRow columnsCount={isCollapsed ? columns.length + 1 : columns.length}>
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
            <Table stickyHeader>
                <TableHead>
                    <DataTableRows columns={columns} collapsed={isCollapsed} header />
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
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
export type { Columns };
