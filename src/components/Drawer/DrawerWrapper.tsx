import { styled } from '@mui/material/styles';

interface DrawerWrapperProps {
    drawerWidth: number;
}

const DrawerWrapper = styled('nav', { shouldForwardProp: (prop) => prop !== 'drawerWidth' })<DrawerWrapperProps>(
    ({ theme, drawerWidth }) => ({ [theme.breakpoints.up('lg')]: { width: drawerWidth, flexShrink: 0 } })
);

export default DrawerWrapper;
