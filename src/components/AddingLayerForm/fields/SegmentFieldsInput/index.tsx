import { useField } from 'react-final-form';

import { SegmentFieldInputValue, SegmentFieldInputValues, isPagesState } from 'components/AddingLayerForm/types';
import DataTable from 'components/DataTable';
import { useWizard } from 'components/Wizard';

import getSegmentFieldsTableColumns from 'components/AddingLayerForm/fields/SegmentFieldsInput/getSegmentFieldsTableColumns';
import getSegmentFieldsTableRows from 'components/AddingLayerForm/fields/SegmentFieldsInput/getSegmentFieldsTableRows';

const SegmentFieldsInput: React.FC = () => {
    const { state } = useWizard();

    if (!isPagesState(state) || state.segment === null) {
        throw new Error('Не задан сегмент');
    }

    const {
        segment: { id },
    } = state;
    const name = `segments.id-${id}.fields`;

    const {
        input: { value },
    } = useField<SegmentFieldInputValues>(name, { subscription: { value: true } });

    const rows = getSegmentFieldsTableRows(value);
    const columns = getSegmentFieldsTableColumns(name);

    return (
        <DataTable<SegmentFieldInputValue, 'status'>
            columns={columns}
            rows={rows}
            maxDisplayRows={8}
            emptyMessage="Нет ни одного поля."
            loading={false}
        />
    );
};

export default SegmentFieldsInput;
