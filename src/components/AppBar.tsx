import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const StyledMuiAppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.common.black,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    [theme.breakpoints.up('md')]: { minHeight: 80 },
}));

interface AppBarProps {
    children?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ children }) => {
    return (
        <StyledMuiAppBar position="fixed" elevation={0}>
            <StyledToolbar>{children}</StyledToolbar>
        </StyledMuiAppBar>
    );
};

export default AppBar;
