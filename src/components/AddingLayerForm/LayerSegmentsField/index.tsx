import { useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import { FieldName } from 'components/AddingLayerForm';
import ChangeStatusChip from 'components/ChangeStatusChip';
import DataTable, { Columns } from 'components/DataTable';
import LightenChip from 'components/LightenChip';
import SearchView from 'components/SearchView';
import isEmpty from 'helpers/isEmpty';
import { ActiveStates, ChangeStates } from 'types/common';
import { SegmentsFieldItem, SegmentsFieldValue } from 'types/segment';

interface LayerSegmentsFieldProps extends FieldRenderProps<SegmentsFieldValue | null> {
    disabled?: boolean;
    loading?: boolean;
}

const getRows = (value: SegmentsFieldValue | null, searchString?: string): SegmentsFieldItem[] => {
    const rows = value ? Object.keys(value).map((key) => value[key]) : [];

    if (searchString) {
        const regexp = new RegExp(searchString, 'i');
        return rows.filter(({ title }) => regexp.test(title));
    }

    return rows;
};
const isActive = (value: SegmentsFieldItem): boolean => value.activeState === ActiveStates.Active;
const setActiveState = (value: SegmentsFieldItem, checked: boolean): SegmentsFieldItem => {
    return {
        ...value,
        activeState: checked ? ActiveStates.Active : ActiveStates.Disabled,
    };
};

const collapsedDataRender = (item: SegmentsFieldItem): React.ReactNode => (
    <Stack spacing={2}>
        <Typography variant="subtitle2">Роли</Typography>
        <Stack direction="row" spacing={2}>
            {item.roles.map(({ id, name }) => (
                <LightenChip key={id} label={name} color={'primary'} />
            ))}
        </Stack>
        <Typography variant="subtitle2">Теги</Typography>
        <Stack direction="row" spacing={2}>
            {item.tags.map((name) => (
                <LightenChip key={name} label={name} color={'secondary'} />
            ))}
        </Stack>
    </Stack>
);

const LayerSegmentsField: React.FC<LayerSegmentsFieldProps> = ({ input, disabled, loading }) => {
    const [searchString, setSearchString] = useState('');
    const rows = getRows(input.value, searchString);
    const columns: Columns<SegmentsFieldItem, 'disabled' | 'status' | 'actions'> = [
        {
            key: 'title',
            field: 'title',
            headerName: 'Наименование',
            align: 'left',
            valueGetter: ({ title }, searchString = '') =>
                isEmpty(searchString) ? (
                    title
                ) : (
                    <SearchView subString={searchString} variant="body2">
                        {title}
                    </SearchView>
                ),
        },
        {
            key: 'disabled',
            align: 'left',
            sx: { width: '1%' },
            valueGetter: (item) =>
                !item.isNew && (
                    <Field<SegmentsFieldItem, HTMLElement, boolean>
                        type="checkbox"
                        name={`${FieldName.Segments}.id-${item.id}`}
                        format={isActive}
                        parse={(checked) => setActiveState(item, checked)}
                    >
                        {({ input }) => <Switch {...input} disabled={disabled} />}
                    </Field>
                ),
        },
        {
            key: 'status',
            field: 'isNew',
            headerName: '',
            align: 'right',
            sx: { width: '1%' },
            valueGetter: ({ isNew }) => isNew && <ChangeStatusChip type={ChangeStates.New} variant="outlined" />,
        },
        {
            key: 'id',
            field: 'id',
            headerName: 'ID',
            align: 'center',
            sx: { width: 100 },
        },
        {
            key: 'actions',
            align: 'right',
            sx: { width: '1%' },
            valueGetter: ({ isNew }) =>
                isNew ? (
                    <Stack direction="row">
                        <IconButton size="small" disabled={disabled}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" disabled={disabled}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                ) : (
                    <IconButton size="small" disabled={disabled}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                ),
        },
    ];

    const searchHandle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <>
            <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 2, mb: 2 }}>
                Выберете сегменты которые необходимо добавить в слой.
            </Typography>
            <Stack direction="row" alignItems="center" spacing={4} sx={{ mb: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                        <TextField
                            value={searchString}
                            onChange={searchHandle}
                            placeholder="Начните вводить наименование"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            disabled={disabled}
                            fullWidth
                        />
                    </Box>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <AddButton disabled={disabled}>Добавить сегмент</AddButton>
                </Box>
            </Stack>
            <Box sx={{ mb: 4 }}>
                <DataTable<SegmentsFieldItem, 'disabled' | 'status' | 'actions'>
                    columns={columns}
                    rows={rows}
                    maxDisplayRows={8}
                    searchString={searchString}
                    emptyMessage="Нет ни одного сегмента."
                    searchEmptyMessage="Не найдено ни одного сегмента."
                    collapsedDataRender={collapsedDataRender}
                    loading={loading}
                />
            </Box>
        </>
    );
};

export default LayerSegmentsField;
