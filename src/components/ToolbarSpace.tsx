import { styled } from '@mui/material/styles';

const ToolbarSpace = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('md')]: { minHeight: 80 },
}));

export default ToolbarSpace;
