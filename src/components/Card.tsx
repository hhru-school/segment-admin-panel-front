import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const enum Color {
    DEFAULT = 'default',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
    SUCCESS = 'success',
}

export interface CardProps {
    color?: `${Color}`;
    caption?: string;
    children?: React.ReactNode;
}

const OuterBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'color' })<CardProps>(
    ({ theme, color = Color.DEFAULT }) => ({
        width: '100%',
        border: '1px solid',
        borderRadius: theme.shape.borderRadius,
        ...(color === Color.DEFAULT && {
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.divider,
        }),
        ...(color === Color.PRIMARY && {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
        }),
        ...(color === Color.SECONDARY && {
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.main,
        }),
        ...(color === Color.INFO && {
            borderColor: theme.palette.info.main,
            backgroundColor: theme.palette.info.main,
        }),
        ...(color === Color.ERROR && {
            borderColor: theme.palette.error.main,
            backgroundColor: theme.palette.error.main,
        }),
        ...(color === Color.SUCCESS && {
            borderColor: theme.palette.success.main,
            backgroundColor: theme.palette.success.main,
        }),
        ...(color === Color.WARNING && {
            borderColor: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.main,
        }),
    })
);

const InnerBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: '8px 16px',
    borderRadius: theme.shape.borderRadius - 1,
    backgroundColor: theme.palette.background.paper,
}));

const Header = styled(Typography, { shouldForwardProp: (prop) => prop !== 'color' })<CardProps>(
    ({ theme, color = Color.DEFAULT }) => ({
        padding: '6px 16px',
        fontWeight: 500,
        textAlign: 'right',
        ...(color === Color.DEFAULT && {
            color: theme.palette.text.primary,
        }),
        ...(color === Color.PRIMARY && {
            color: theme.palette.primary.contrastText,
        }),
        ...(color === Color.SECONDARY && {
            color: theme.palette.secondary.contrastText,
        }),
        ...(color === Color.INFO && {
            color: theme.palette.info.contrastText,
        }),
        ...(color === Color.ERROR && {
            color: theme.palette.error.contrastText,
        }),
        ...(color === Color.SUCCESS && {
            color: theme.palette.success.contrastText,
        }),
        ...(color === Color.WARNING && {
            color: theme.palette.warning.contrastText,
        }),
    })
);

const Card: React.FC<CardProps> = ({ caption, children, color }) => {
    return (
        <OuterBox color={color}>
            <Header variant="body2" color={color}>
                {caption}
            </Header>
            <InnerBox>{children}</InnerBox>
        </OuterBox>
    );
};

export default Card;
