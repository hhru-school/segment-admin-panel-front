import { Field } from 'react-final-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

import { PageName } from 'components/AddingLayerForm';
import { PagesState, SegmentInputValue } from 'components/AddingLayerForm/types';
import ChangeStatusChip from 'components/ChangeStatusChip';
import { Columns, ValueGetter } from 'components/DataTable/DataTableRows';
import SearchView from 'components/SearchView';
import { SetPageHandler } from 'components/Wizard';
import isActive from 'helpers/isActive';
import isEmpty from 'helpers/isEmpty';
import { ActiveStates, ChangeStates } from 'types/common';

const renderTitle: ValueGetter<SegmentInputValue> = ({ title }, searchString = '') => {
    if (isEmpty(searchString)) {
        return title;
    }

    return (
        <SearchView subString={searchString} variant="body2">
            {title}
        </SearchView>
    );
};
const renderNewStatus: ValueGetter<SegmentInputValue> = ({ isNew }) => {
    if (!isNew) {
        return null;
    }

    return <ChangeStatusChip type={ChangeStates.New} variant="outlined" />;
};
const getRenderActiveStateControl = (disabled: boolean): ValueGetter<SegmentInputValue> => {
    const setActiveState = (value: SegmentInputValue, checked: boolean): SegmentInputValue => {
        return { ...value, activeState: checked ? ActiveStates.Active : ActiveStates.Disabled };
    };

    return (item) => {
        const { id, isNew } = item;

        if (isNew) {
            return null;
        }

        return (
            <Field<SegmentInputValue, HTMLElement, boolean>
                type="checkbox"
                name={`segments.id-${id}`}
                format={(value) => isActive(value.activeState)}
                parse={(checked) => setActiveState(item, checked)}
            >
                {({ input }) => <Switch {...input} disabled={disabled} />}
            </Field>
        );
    };
};
const getRenderActions = (
    state: PagesState,
    disabled: boolean,
    setActivePageHandler: SetPageHandler,
    removeSegmentHandler: (id: number | string) => void
): ValueGetter<SegmentInputValue> => {
    return (item) => {
        const backState: PagesState = {
            ...state,
            segment: item,
            entryPoint: null,
            newDynamicScreen: null,
        };

        const handelSetEditSegmentPage = () => setActivePageHandler(PageName.Details, backState);

        if (item.isNew) {
            return (
                <Stack direction="row">
                    <IconButton size="small" disabled={disabled} onClick={handelSetEditSegmentPage}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" disabled={disabled} onClick={() => removeSegmentHandler(item.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            );
        }

        return (
            <IconButton size="small" disabled={disabled} onClick={handelSetEditSegmentPage}>
                <EditIcon fontSize="small" />
            </IconButton>
        );
    };
};

interface SegmentsTableColumnsGetter {
    (options: {
        state: PagesState;
        disabled: boolean;
        setActivePageHandler: SetPageHandler;
        removeSegmentHandler: (id: number | string) => void;
    }): Columns<SegmentInputValue, 'disabled' | 'status' | 'actions'>;
}

const getSegmentsTableColumns: SegmentsTableColumnsGetter = ({
    state,
    disabled,
    setActivePageHandler,
    removeSegmentHandler,
}) => {
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
            valueGetter: getRenderActions(state, disabled, setActivePageHandler, removeSegmentHandler),
        },
    ];
};

export default getSegmentsTableColumns;
