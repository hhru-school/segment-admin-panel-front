import MuiIconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    '& .MuiTouchRipple-root .MuiTouchRipple-child': {
        borderRadius: theme.shape.borderRadius,
    },
    ':hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
})) as typeof MuiIconButton;

export default IconButton;
