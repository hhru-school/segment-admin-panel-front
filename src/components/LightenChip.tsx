import Chip, { ChipProps } from '@mui/material/Chip';
import { styled, lighten } from '@mui/material/styles';

export type LightenChipProps = Omit<ChipProps, 'variant'>;

const LightenChip = styled(Chip, { shouldForwardProp: (prop) => prop !== 'color' })<LightenChipProps>(
    ({ theme, color }) => ({
        ...(color === 'primary' && {
            color: theme.palette.primary.dark,
            backgroundColor: lighten(theme.palette.primary.main, 0.9),
        }),
        ...(color === 'secondary' && {
            color: theme.palette.secondary.dark,
            backgroundColor: lighten(theme.palette.secondary.main, 0.9),
        }),
        ...(color === 'info' && {
            color: theme.palette.info.dark,
            backgroundColor: lighten(theme.palette.info.main, 0.9),
        }),
        ...(color === 'success' && {
            color: theme.palette.success.dark,
            backgroundColor: lighten(theme.palette.success.main, 0.9),
        }),
        ...(color === 'error' && {
            color: theme.palette.error.dark,
            backgroundColor: lighten(theme.palette.error.main, 0.9),
        }),
        ...(color === 'warning' && {
            color: theme.palette.warning.dark,
            backgroundColor: lighten(theme.palette.warning.main, 0.9),
        }),
    })
);

export default LightenChip;
