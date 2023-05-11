import AddIcon from '@mui/icons-material/Add';
import Button, { ButtonProps } from '@mui/material/Button';

const AddButton: React.FC<Pick<ButtonProps, 'href' | 'disabled' | 'children'>> = ({ children, href, disabled }) => {
    return (
        <Button href={href} startIcon={<AddIcon />} variant="contained" disabled={disabled}>
            {children}
        </Button>
    );
};

export default AddButton;
