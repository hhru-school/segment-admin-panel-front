import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { FieldsList } from 'models/screens';

import { Variant } from 'components/Screen';

interface ScreenFieldsListProps {
    fields: FieldsList;
    variant?: `${Variant}`;
}

const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<ScreenFieldsListProps, 'variant'>
>(({ variant = Variant.STATIC }) => ({
    backgroundClip: 'content-box',
    ...(variant === Variant.STATIC && { backgroundColor: '#fff2f2' }),
    ...(variant === Variant.DYNAMIC && { backgroundColor: '#e8f1fb' }),
}));

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<ScreenFieldsListProps, 'variant'>
>(({ variant = Variant.STATIC }) => ({
    ...(variant === Variant.STATIC && { '&:nth-of-type(even)': { backgroundColor: '#ffe6e6' } }),
    ...(variant === Variant.DYNAMIC && { '&:nth-of-type(odd)': { backgroundColor: '#d1e4f6' } }),
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
