import { Field } from 'react-final-form';
import Typography from '@mui/material/Typography';

import ActiveStatusChip from 'components/ActiveStatusChip';
import { SegmentFieldInputValue } from 'components/AddingLayerForm/types';
import ChangeStatusChip from 'components/ChangeStatusChip';
import { Columns, ValueGetter } from 'components/DataTable/DataTableRows';
import FieldRequiredControl from 'components/FieldRequiredControl';
import { ActiveStates, ChangeStates } from 'types/common';

const renderTitle: ValueGetter<SegmentFieldInputValue> = ({ title, isDisabled }) => {
    if (isDisabled) {
        return (
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                {title}
            </Typography>
        );
    }
    return title;
};
const renderStatus: ValueGetter<SegmentFieldInputValue> = ({ isNew, isDisabled }) => {
    if (isDisabled) {
        return <ActiveStatusChip type={ActiveStates.Disabled} label="Удалено" />;
    }
    if (isNew) {
        return <ChangeStatusChip type={ChangeStates.New} label="Новое" variant="outlined" />;
    }
    return null;
};

const getRenderRequiredControl = (name: string): ValueGetter<SegmentFieldInputValue> => {
    const changeHandle = (value: SegmentFieldInputValue, checked: boolean): SegmentFieldInputValue => {
        return { ...value, required: checked, isChanged: value.isNew ? false : !value.isChanged };
    };
    const isRequired = (value: SegmentFieldInputValue): boolean => value.required;

    return (field) => {
        const { id, isChanged, isDisabled } = field;
        return (
            <Field<SegmentFieldInputValue, HTMLElement, boolean>
                type="checkbox"
                name={`${name}.id-${id}`}
                format={(value) => isRequired(value)}
                parse={(checked) => changeHandle(field, checked)}
            >
                {(props) => <FieldRequiredControl {...props} isChanged={isChanged} disabled={isDisabled} />}
            </Field>
        );
    };
};

const getSegmentFieldsTableColumns = (name: string): Columns<SegmentFieldInputValue, 'status'> => {
    return [
        {
            key: 'title',
            field: 'title',
            headerName: 'Наименование',
            align: 'left',
            valueGetter: renderTitle,
        },
        {
            key: 'status',
            headerName: '',
            align: 'right',
            sx: { width: '1%' },
            valueGetter: renderStatus,
        },
        {
            key: 'required',
            field: 'required',
            headerName: 'Обязательное?',
            align: 'center',
            sx: { width: 160 },
            valueGetter: getRenderRequiredControl(name),
        },
    ];
};

export default getSegmentFieldsTableColumns;
