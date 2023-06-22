import Typography from '@mui/material/Typography';

import ChangeBox from 'components/ChangeBox';
import IconWrapper from 'components/IconWrapper';

interface FieldRequiredViewProps {
    required?: boolean;
    isChanged?: boolean;
    disabled?: boolean;
}

interface ValueProps {
    required?: boolean;
    disabled?: boolean;
}

const Value: React.FC<ValueProps> = ({ required, disabled }) => {
    return (
        <IconWrapper>
            <Typography
                sx={{
                    width: 32,
                    textAlign: 'center',
                    color: disabled ? 'text.disabled' : 'inherit',
                    lineHeight: '24px',
                }}
                variant="body2"
            >
                {required ? 'Да' : 'Нет'}
            </Typography>
        </IconWrapper>
    );
};

const FieldRequiredView: React.FC<FieldRequiredViewProps> = ({ required, isChanged, disabled }) => {
    return (
        <ChangeBox
            currentValue={<Value required={required} disabled={disabled} />}
            previousValue={isChanged ? <Value required={!required} /> : null}
            changed={isChanged}
            disabled={disabled}
        />
    );
};

export default FieldRequiredView;
