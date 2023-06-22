import { useField } from 'react-final-form';

import { SegmentFieldInputValue, SegmentFieldInputValues } from 'components/AddingLayerForm/types';
import DataTable from 'components/DataTable';

import getSegmentFieldsTableColumns from 'components/AddingLayerForm/fields/SegmentFieldsInput/getSegmentFieldsTableColumns';
import getSegmentFieldsTableRows from 'components/AddingLayerForm/fields/SegmentFieldsInput/getSegmentFieldsTableRows';

interface SegmentFieldsInputProps {
    name: string;
}

const SegmentFieldsInput: React.FC<SegmentFieldsInputProps> = ({ name }) => {
    const fieldsName = `${name}.fields`;

    const {
        input: { value },
    } = useField<SegmentFieldInputValues>(fieldsName, { subscription: { value: true } });

    const rows = getSegmentFieldsTableRows(value);
    const columns = getSegmentFieldsTableColumns(fieldsName);
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
