import { styled } from '@mui/material/styles';

const Main = styled('main')(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
    },
    flexGrow: 1,
}));

export default Main;
