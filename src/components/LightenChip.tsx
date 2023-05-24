import Chip, { ChipProps } from '@mui/material/Chip';
import { styled, lighten } from '@mui/material/styles';

export type LightenChipProps = Omit<ChipProps, 'variant'>;

const LightenChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== 'color',
})<LightenChipProps>(({ theme, color }) => ({
    ...(color === 'primary' && {
        color: theme.palette.primary.dark,
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
        '& .MuiChip-deleteIcon': {
            color: theme.palette.primary.dark,
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    }),
    ...(color === 'secondary' && {
        color: theme.palette.secondary.dark,
        backgroundColor: lighten(theme.palette.secondary.main, 0.9),
        '& .MuiChip-deleteIcon': {
            color: theme.palette.secondary.dark,
            '&:hover': {
                color: theme.palette.secondary.main,
            },
        },
    }),
    ...(color === 'info' && {
        color: theme.palette.info.dark,
        backgroundColor: lighten(theme.palette.info.main, 0.9),
        '& .MuiChip-deleteIcon': {
            color: theme.palette.info.dark,
            '&:hover': {
                color: theme.palette.info.main,
            },
        },
    }),
    ...(color === 'success' && {
        color: theme.palette.success.dark,
        backgroundColor: lighten(theme.palette.success.main, 0.9),
        '& .MuiChip-deleteIcon': {
            color: theme.palette.success.dark,
            '&:hover': {
                color: theme.palette.success.main,
            },
        },
    }),
    ...(color === 'error' && {
        color: theme.palette.error.dark,
        backgroundColor: lighten(theme.palette.error.main, 0.9),
        '& .MuiChip-deleteIcon': {
            color: theme.palette.error.dark,
            '&:hover': {
                color: theme.palette.error.main,
            },
        },
    }),
    ...(color === 'warning' && {
        color: theme.palette.warning.dark,
        backgroundColor: lighten(theme.palette.warning.main, 0.9),
        '& .MuiChip-deleteIcon': {
            color: theme.palette.warning.dark,
            '&:hover': {
                color: theme.palette.warning.main,
            },
        },
    }),
}));

export default LightenChip;
