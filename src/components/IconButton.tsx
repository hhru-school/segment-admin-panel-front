import MuiIconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[100],
    '& .MuiTouchRipple-root .MuiTouchRipple-child': {
        borderRadius: theme.spacing(0.5),
    },
    ':hover': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
})) as typeof MuiIconButton;

export default IconButton;
