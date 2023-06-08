import { shallowEqual } from 'react-redux';
import Typography from '@mui/material/Typography';

import isDisabled from 'helpers/isDisabled';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayerSegmentFields } from 'models/currentLayerSegment';
import { ChangeStates } from 'types/common';
import { SegmentField } from 'types/field';

import ActiveStatusChip from 'components/ActiveStatusChip';
import ChangeStatusChip from 'components/ChangeStatusChip';
import DataTable, { Columns } from 'components/DataTable';
import FieldRequiredView from 'components/FieldRequiredView';

const columns: Columns<SegmentField, 'status'> = [
    {
        key: 'title',
        field: 'title',
        headerName: 'Наименование',
        align: 'left',
        valueGetter: (field) => {
            if (field === undefined) {
                return null;
            }

            if (isDisabled(field.state)) {
                return (
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {field.title}
                    </Typography>
                );
            }
            return field.title;
        },
    },
    {
        key: 'status',
        headerName: '',
        align: 'right',
        sx: { width: '1%' },
        valueGetter: (field) => {
            if (field === undefined) {
                return null;
            }

            if (isDisabled(field.state)) {
                return <ActiveStatusChip type={field.state} label="Удалено" />;
            }

            if (field.isNew) {
                return <ChangeStatusChip type={ChangeStates.New} label="Новое" variant="outlined" />;
            }

            return null;
        },
    },
    {
        key: 'required',
        field: 'required',
        headerName: 'Обязательное?',
        align: 'center',
        sx: { width: 160 },
        valueGetter: (field) => {
            if (field === undefined) {
                return null;
            }
            return (
                <FieldRequiredView
                    required={field.required}
                    isChanged={field.isChanged}
                    disabled={isDisabled(field.state)}
                />
            );
        },
    },
];

const LayerSegmentFieldsTable: React.FC = () => {
    const fields = useAppSelector(selectCurrentLayerSegmentFields, shallowEqual);

    return (
        <DataTable<SegmentField, 'status'>
            columns={columns}
            rows={fields}
            emptyMessage="Нет ни одного поля."
            loading={false}
        />
    );
};

export default LayerSegmentFieldsTable;
