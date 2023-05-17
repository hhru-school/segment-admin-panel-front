import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { FieldsList } from 'models/screens';

import { Variant } from 'components/Screen';

interface ScreenFieldsListProps {
    fields: FieldsList;
    variant?: `${Variant}`;
    filtered?: boolean;
}

const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'filtered' })<
    Pick<ScreenFieldsListProps, 'variant' | 'filtered'>
>(({ variant = Variant.STATIC, filtered }) => ({
    backgroundClip: 'content-box',
    ...(variant === Variant.STATIC && { backgroundColor: '#fff2f2' }),
    ...(variant === Variant.DYNAMIC && { backgroundColor: '#e8f1fb' }),
    ...(filtered && { backgroundColor: '#f2f2f2' }),
}));

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'filtered' })<
    Pick<ScreenFieldsListProps, 'variant' | 'filtered'>
>(({ variant = Variant.STATIC, filtered }) => ({
    ...(variant === Variant.STATIC && { '&:nth-of-type(even)': { backgroundColor: '#ffe6e6' } }),
    ...(variant === Variant.DYNAMIC && { '&:nth-of-type(odd)': { backgroundColor: '#d1e4f6' } }),
    ...(filtered && {
        '&:nth-of-type(even)': { backgroundColor: '#e5e5e5' },
        '&:nth-of-type(odd)': { backgroundColor: 'unset' },
    }),
}));

const ScreenFieldsList: React.FC<ScreenFieldsListProps> = ({ fields, variant, filtered }) => {
    return (
        <StyledList variant={variant} filtered={filtered}>
            {fields.map(({ id, title }) => (
                <StyledListItem key={id} variant={variant} filtered={filtered} dense>
                    <ListItemText primary={title} />
                </StyledListItem>
            ))}
        </StyledList>
    );
};

export default ScreenFieldsList;
