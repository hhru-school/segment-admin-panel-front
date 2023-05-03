import { styled } from '@mui/material/styles';

const Main = styled('main')(({ theme }) => ({
    padding: `0 ${theme.spacing(3)} ${theme.spacing(3)}`,
    [theme.breakpoints.up('sm')]: {
        padding: `0 ${theme.spacing(6)} ${theme.spacing(6)}`,
    },
    flexGrow: 1,
}));

export default Main;
