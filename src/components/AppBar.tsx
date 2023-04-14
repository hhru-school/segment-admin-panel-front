import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const StyledMuiAppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
}));

interface AppBarProps {
    children?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ children }) => {
    return (
        <StyledMuiAppBar position="fixed" elevation={0}>
            <Toolbar>{children}</Toolbar>
        </StyledMuiAppBar>
    );
};

export default AppBar;
