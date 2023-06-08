import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { ScreenType, ScreenTypes } from 'types/screen';

interface CardProps {
    variant: ScreenType;
    positionView?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
}

const StyledBox = styled(Stack, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'disabled' })<
    Pick<CardProps, 'variant' | 'disabled'>
>(({ theme, variant, disabled }) => ({
    padding: 16,
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    ...(variant === ScreenTypes.Static && { borderColor: theme.palette.secondary.light }),
    ...(variant === ScreenTypes.Dynamic && { borderColor: theme.palette.primary.light }),
    ...(disabled && {
        color: theme.palette.text.disabled,
        borderColor: theme.palette.action.disabled,
        backgroundColor: theme.palette.grey[50],
        filter: 'grayscale(1)',
    }),
}));

const Card: React.FC<CardProps> = ({ variant, positionView, children, disabled }) => {
    return (
        <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
            {positionView}
            <StyledBox variant={variant} spacing={1} sx={{ flexGrow: 1, ml: -0.5 }} disabled={disabled}>
                {children}
            </StyledBox>
        </Stack>
    );
};

export default Card;
