import { FieldRenderProps } from 'react-final-form';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/material/Checkbox';

import { SegmentFieldInputValue } from 'components/AddingLayerForm/types';
import ChangeBox from 'components/ChangeBox';
import IconWrapper from 'components/IconWrapper';

interface FieldRequiredControlProps extends FieldRenderProps<SegmentFieldInputValue, HTMLElement, boolean> {
    isChanged?: boolean;
    disabled?: boolean;
}

interface ValueProps {
    required?: boolean;
    disabled?: boolean;
}

const Value: React.FC<ValueProps> = ({ required, disabled }) => {
    const color = disabled ? 'disabled' : 'inherit';
    return <IconWrapper>{required ? <CheckBoxIcon color={color} /> : <CheckBoxBlankIcon color={color} />}</IconWrapper>;
};

const FieldRequiredControl: React.FC<FieldRequiredControlProps> = ({ input, isChanged, disabled }) => {
    return (
        <ChangeBox
            currentValue={<CheckBox {...input} disabled={disabled} />}
            previousValue={<Value required={isChanged ? !input.checked : input.checked} />}
            changed={isChanged}
            disabled={disabled}
        />
    );
};

export default FieldRequiredControl;
