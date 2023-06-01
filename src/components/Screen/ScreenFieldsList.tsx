import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, lighten } from '@mui/material/styles';

import { FieldsList } from 'types/field';

import { Variant } from 'components/Screen';

interface ScreenFieldsListProps {
    fields: FieldsList;
    variant?: `${Variant}`;
}

const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<ScreenFieldsListProps, 'variant'>
>(({ theme, variant = Variant.STATIC }) => ({
    backgroundClip: 'content-box',
    ...(variant === Variant.STATIC && { backgroundColor: lighten(theme.palette.secondary.light, 0.9) }),
    ...(variant === Variant.DYNAMIC && { backgroundColor: lighten(theme.palette.primary.light, 0.9) }),
}));

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<ScreenFieldsListProps, 'variant'>
>(({ theme, variant = Variant.STATIC }) => ({
    hyphens: 'auto',
    ...(variant === Variant.STATIC && {
        '&:nth-of-type(even)': { backgroundColor: lighten(theme.palette.secondary.light, 0.8) },
    }),
    ...(variant === Variant.DYNAMIC && {
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
