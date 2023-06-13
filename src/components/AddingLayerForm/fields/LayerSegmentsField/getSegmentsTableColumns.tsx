import { Field } from 'react-final-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

import { FieldName } from 'components/AddingLayerForm';
import ChangeStatusChip from 'components/ChangeStatusChip';
import { Columns, ValueGetter } from 'components/DataTable/DataTableRows';
import SearchView from 'components/SearchView';
import isEmpty from 'helpers/isEmpty';
import { ActiveStates, ChangeStates } from 'types/common';
import { SegmentsFieldItem } from 'types/segment';

const renderTitle: ValueGetter<SegmentsFieldItem> = ({ title }, searchString = '') => {
    if (isEmpty(searchString)) {
        return title;
    }

    return (
        <SearchView subString={searchString} variant="body2">
            {title}
        </SearchView>
    );
};
const renderNewStatus: ValueGetter<SegmentsFieldItem> = ({ isNew }) => {
    if (!isNew) {
        return null;
    }

    return <ChangeStatusChip type={ChangeStates.New} variant="outlined" />;
};
const getRenderActiveStateControl = (disabled: boolean): ValueGetter<SegmentsFieldItem> => {
    const isActive = (value: SegmentsFieldItem): boolean => value.activeState === ActiveStates.Active;
    const setActiveState = (value: SegmentsFieldItem, checked: boolean): SegmentsFieldItem => {
        return {
            ...value,
            activeState: checked ? ActiveStates.Active : ActiveStates.Disabled,
        };
    };

    return (item) => {
        const { id, isNew } = item;

        if (isNew) {
            return null;
        }

        return (
            <Field<SegmentsFieldItem, HTMLElement, boolean>
                type="checkbox"
                name={`${FieldName.Segments}.id-${id}`}
                format={isActive}
                parse={(checked) => setActiveState(item, checked)}
            >
                {({ input }) => <Switch {...input} disabled={disabled} />}
            </Field>
        );
    };
};
const getRenderActions = (disabled: boolean): ValueGetter<SegmentsFieldItem> => {
    return ({ isNew }) => {
        if (isNew) {
            return (
                <Stack direction="row">
                    <IconButton size="small" disabled={disabled}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" disabled={disabled}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            );
        }

        return (
            <IconButton size="small" disabled={disabled}>
                <EditIcon fontSize="small" />
            </IconButton>
        );
    };
};

interface SegmentsTableColumnsGetter {
    (options: { disabled: boolean }): Columns<SegmentsFieldItem, 'disabled' | 'status' | 'actions'>;
}

const getSegmentsTableColumns: SegmentsTableColumnsGetter = ({ disabled }) => {
    return [
        {
            key: 'title',
            field: 'title',
            headerName: 'Наименование',
            align: 'left',
            valueGetter: renderTitle,
        },
        {
            key: 'disabled',
            align: 'left',
            sx: { width: '1%' },
            valueGetter: getRenderActiveStateControl(disabled),
        },
        {
            key: 'status',
            field: 'isNew',
            headerName: '',
            align: 'right',
            sx: { width: '1%' },
            valueGetter: renderNewStatus,
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
            valueGetter: getRenderActions(disabled),
        },
    ];
};

export default getSegmentsTableColumns;
