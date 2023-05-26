import Box from '@mui/material/Box';

interface MainProps {
    children?: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <Box component="main" sx={{ flexGrow: 1, px: { xs: 2, sm: 3 } }}>
            {children}
        </Box>
    );
};

export default Main;
