import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableDataRowProps, DataRender } from 'components/Table/TableDataRow';

interface TableCollapsedDataRowProps<T, K = unknown> extends TableDataRowProps<T, K> {
    children?: React.ReactNode;
}

const TableCollapsedDataRow = <T extends object, K = unknown>({
    row,
    columns,
    dataRender,
    children,
}: TableCollapsedDataRowProps<T, K>): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <TableRow sx={{ '& > td': { borderBottom: 'unset' } }}>
                <TableCell sx={{ width: '66px' }}>
                    <IconButton onClick={handleToggleOpen} size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {columns.map(({ key, align, width }) => (
                    <TableCell key={key} align={align} sx={{ width }}>
                        {dataRender(key, row)}
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell sx={{ py: 0, pr: 0, pl: '66px' }} colSpan={columns.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ my: 1 }}>{children}</Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableCollapsedDataRow;
export type { DataRender };
