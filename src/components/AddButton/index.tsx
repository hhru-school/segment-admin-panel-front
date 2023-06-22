import AddIcon from '@mui/icons-material/Add';
import Button, { ButtonProps } from '@mui/material/Button';

const AddButton: React.FC<Pick<ButtonProps, 'onClick' | 'href' | 'disabled' | 'children'>> = ({
    children,
    onClick,
    href,
    disabled,
}) => {
    return (
        <Button onClick={onClick} href={href} startIcon={<AddIcon />} variant="contained" disabled={disabled}>
            {children}
        </Button>
    );
};

export default AddButton;
