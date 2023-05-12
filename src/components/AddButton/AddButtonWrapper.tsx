import Box from '@mui/material/Box';

interface AddButtonWrapperProps {
    children?: React.ReactNode;
}

const AddButtonWrapper: React.FC<AddButtonWrapperProps> = ({ children }) => {
    return <Box sx={{ mb: 4, ml: 'auto', width: 'max-content' }}>{children}</Box>;
};

export default AddButtonWrapper;
