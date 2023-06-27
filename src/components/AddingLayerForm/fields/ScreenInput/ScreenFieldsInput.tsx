import { useMemo } from 'react';
import { useForm } from 'react-final-form';
import List from '@mui/material/List';

import AddFieldInput from 'components/AddingLayerForm/fields/AddFieldInput';
import getSegmentName from 'components/AddingLayerForm/helpers/getSegmentName';
import { ScreenFieldInputValues } from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';
import indexToPosition from 'helpers/indexToPosition';
import { Question } from 'types/field';

import ScreenFieldInput from 'components/AddingLayerForm/fields/ScreenInput/ScreenFieldInput';

interface ScreenFieldsInputProps {
    name: string;
    fields: ScreenFieldInputValues;
    dynamic?: boolean;
    disabled?: boolean;
}

const ScreenFieldsInput: React.FC<ScreenFieldsInputProps> = ({ name, fields, dynamic, disabled }) => {
    const form = useForm();
    const fieldsArray = useMemo(() => idMapToArray(fields), [fields]);
    const segmentName = getSegmentName(name);

    const handleAddField = (value: Question) => {
        form.mutators.addFieldToScreen(name, value, indexToPosition(fieldsArray.length));
        form.mutators.updateSegmentFields(segmentName);
    };

    return (
        <>
            <List>
                {fieldsArray.map((field) => (
                    <ScreenFieldInput
                        key={field.id}
                        name={`${name}.id-${field.id}`}
                        field={field}
                        disabled={disabled}
                        dynamic={dynamic}
                    />
                ))}
            </List>
            {dynamic && <AddFieldInput currentFields={fields} addField={handleAddField} disabled={disabled} />}
        </>
    );
};

export default ScreenFieldsInput;
