import Stack from '@mui/material/Stack';

interface ContainerProps {
    children?: React.ReactNode;
    isField?: boolean;
    disabled?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, isField, disabled }) => {
    return (
        <Stack
            spacing={isField ? 0 : 0.5}
            sx={{
                width: 'min-content',
                color: disabled ? 'action.disabled' : 'action.active',
                ...(disabled && { filter: 'grayscale(1)' }),
            }}
        >
            {children}
        </Stack>
    );
};

export default Container;
