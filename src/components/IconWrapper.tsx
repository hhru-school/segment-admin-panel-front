import Box from '@mui/material/Box';

interface IconWrapperProps {
    children?: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
    return <Box sx={{ p: 1, borderRadius: '999em', lineHeight: '0' }}>{children}</Box>;
};

export default IconWrapper;
