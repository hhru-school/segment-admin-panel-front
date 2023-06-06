import EastIcon from '@mui/icons-material/East';
import Stack from '@mui/material/Stack';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { lighten, styled } from '@mui/material/styles';

interface ChangeTooltipProps extends Pick<TooltipProps, 'placement' | 'children'> {
    currentValue: React.ReactNode;
    previousValue?: React.ReactNode;
    disabled?: boolean;
}

const StyledTooltip = styled(
    ({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />,
    { shouldForwardProp: (prop) => prop !== 'disabled' }
)<Pick<ChangeTooltipProps, 'disabled'>>(({ theme, disabled }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: lighten(theme.palette.info.light, 0.92),
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: lighten(theme.palette.info.light, 0.92),
        color: theme.palette.text.primary,
        ...theme.typography.body1,
        ...(disabled && {
            color: theme.palette.text.disabled,
            filter: 'grayscale(1)',
        }),
    },
}));

const ChangeTooltip: React.FC<ChangeTooltipProps> = ({
    currentValue,
    previousValue,
    placement,
    children,
    disabled,
}) => {
    return (
        <StyledTooltip
            title={
                <Stack direction="row" alignItems="center" flexWrap="nowrap">
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ color: disabled ? 'action.disabled' : 'action.active' }}
                    >
                        {previousValue}
                    </Stack>
                    <EastIcon color={disabled ? 'disabled' : 'info'} sx={{ width: 16, height: 16, mx: 1 }} />
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        {currentValue}
                    </Stack>
                </Stack>
            }
            placement={placement}
            disabled={disabled}
            arrow
            disableInteractive
        >
            {children}
        </StyledTooltip>
    );
};

export default ChangeTooltip;
