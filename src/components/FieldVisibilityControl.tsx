import IconButton from '@mui/material/IconButton';

import { FieldVisibilityState, FieldVisibilityStates } from 'types/field';

import ChangeBox from 'components/ChangeBox';
import { icon } from 'components/FieldVisibilityView';
import IconWrapper from 'components/IconWrapper';

interface FieldVisibilityControlProps {
    value: FieldVisibilityState;
    previousValue?: FieldVisibilityState;
    onChange: (value: FieldVisibilityState) => void;
    disabled?: boolean;
}

const newState = new Map<FieldVisibilityState, FieldVisibilityState>([
    [FieldVisibilityStates.Show, FieldVisibilityStates.Hide],
    [FieldVisibilityStates.Hide, FieldVisibilityStates.HidePrefilled],
    [FieldVisibilityStates.HidePrefilled, FieldVisibilityStates.ShowPrefilled],
    [FieldVisibilityStates.ShowPrefilled, FieldVisibilityStates.Show],
]);

const FieldVisibilityControl: React.FC<FieldVisibilityControlProps> = ({
    value,
    previousValue,
    onChange,
    disabled,
}) => {
    const isChanged = previousValue && previousValue !== value;

    const changeHandle = () => {
        const newValue = newState.get(value);

        if (newValue === undefined) {
            throw new TypeError(`Неверное значение FieldVisibilityControl: ${value}`);
        }

        onChange(newValue);
    };

    return (
        <ChangeBox
            currentValue={
                <IconButton onClick={changeHandle} color="inherit" disabled={disabled}>
                    {icon.get(value)}
                </IconButton>
            }
            previousValue={previousValue ? <IconWrapper>{icon.get(previousValue)}</IconWrapper> : null}
            changed={isChanged}
            disabled={disabled}
        />
    );
};

export default FieldVisibilityControl;
