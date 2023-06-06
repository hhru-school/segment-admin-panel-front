import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface HeaderProps {
    state?: React.ReactNode;
    children?: string;
}

const Header: React.FC<HeaderProps> = ({ children, state }) => {
    return (
        <Stack direction="row" alignItems="center">
            <Typography component="h3" variant="h6" sx={{ flexGrow: 1, overflowWrap: 'break-word' }}>
                {children}
            </Typography>
            {state}
        </Stack>
    );
};

export default Header;
