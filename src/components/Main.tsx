import { styled } from '@mui/material/styles';

type MainProps = {
    drawerWidth?: number;
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'drawerWidth' })<MainProps>(
    ({ theme, drawerWidth }) => ({
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        flexGrow: 1,
        ...(drawerWidth != null && { [theme.breakpoints.down('md')]: { width: `calc(100% - ${drawerWidth}px)` } }),
    })
);

export default Main;
