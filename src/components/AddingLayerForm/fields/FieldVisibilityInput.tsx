import { FieldRenderProps } from 'react-final-form';

import FieldVisibilityControl from 'components/FieldVisibilityControl';
import { FieldVisibilityState } from 'types/field';

interface FieldVisibilityInputProps extends FieldRenderProps<FieldVisibilityState> {
    previousValue?: FieldVisibilityState;
    disabled?: boolean;
}

const FieldVisibilityInput: React.FC<FieldVisibilityInputProps> = ({ input, previousValue, disabled }) => {
    const { value, onChange } = input;
    return (
        <FieldVisibilityControl value={value} previousValue={previousValue} onChange={onChange} disabled={disabled} />
    );
};

export default FieldVisibilityInput;
