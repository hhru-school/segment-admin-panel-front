import Stack from '@mui/material/Stack';

interface FormActionsProps {
    children?: React.ReactNode;
}

const FormActions: React.FC<FormActionsProps> = ({ children }) => {
    return (
        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 2, color: 'action.active' }}>
            {children}
        </Stack>
    );
};

export default FormActions;
