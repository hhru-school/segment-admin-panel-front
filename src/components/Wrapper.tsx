import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

interface WrapperProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

const Wrapper: React.FC<WrapperProps> = ({ children, sx }) => {
    return <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'auto', ...sx }}>{children}</Box>;
};

export default Wrapper;
