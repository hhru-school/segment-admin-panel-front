import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, lighten } from '@mui/material/styles';

import { FieldsList } from 'types/field';
import { ScreenType, ScreenTypes } from 'types/screen';

interface ScreenFieldsListProps {
    fields: FieldsList;
    variant?: ScreenType;
}

const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<ScreenFieldsListProps, 'variant'>
>(({ theme, variant = ScreenTypes.Static }) => ({
    backgroundClip: 'content-box',
    ...(variant === ScreenTypes.Static && { backgroundColor: lighten(theme.palette.secondary.light, 0.9) }),
    ...(variant === ScreenTypes.Dynamic && { backgroundColor: lighten(theme.palette.primary.light, 0.9) }),
}));

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<ScreenFieldsListProps, 'variant'>
>(({ theme, variant = ScreenTypes.Static }) => ({
    hyphens: 'auto',
    ...(variant === ScreenTypes.Static && {
        '&:nth-of-type(even)': { backgroundColor: lighten(theme.palette.secondary.light, 0.8) },
    }),
    ...(variant === ScreenTypes.Dynamic && {
        '&:nth-of-type(odd)': { backgroundColor: lighten(theme.palette.primary.light, 0.8) },
    }),
}));

const ScreenFieldsList: React.FC<ScreenFieldsListProps> = ({ fields, variant }) => {
    return (
        <StyledList variant={variant}>
            {fields.map(({ id, title }) => (
                <StyledListItem key={id} variant={variant} dense>
                    <ListItemText primary={title} />
                </StyledListItem>
            ))}
        </StyledList>
    );
};

export default ScreenFieldsList;
