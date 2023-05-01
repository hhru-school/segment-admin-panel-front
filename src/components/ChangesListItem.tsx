import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { lightGreen, red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

interface ChangesListItemProps {
    text?: string;
    variant?: 'created' | 'archive' | 'default';
}

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'variant' })<ChangesListItemProps>(
    ({ theme, variant }) => ({
        paddingLeft: '30px',
        alignItems: 'flex-start',
        borderRadius: theme.spacing(0.5),
        '&:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
        ...(variant === 'created' && {
            color: lightGreen[900],
            backgroundColor: alpha(lightGreen.A400, 0.1),
        }),
        ...(variant === 'archive' && {
            color: red[900],
            backgroundColor: alpha(red.A400, 0.1),
        }),
    })
);

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 0,
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    color: 'inherit',
}));

const icons = new Map<ChangesListItemProps['variant'], JSX.Element>([
    ['created', <AddCircleOutlineIcon />],
    ['archive', <RemoveCircleOutlineIcon />],
]);

const ChangesListItem: React.FC<ChangesListItemProps> = ({ text, variant }) => {
    return (
        <StyledListItem variant={variant}>
            <ListItemText primary={text} />
            {(variant === 'created' || variant === 'archive') && (
                <StyledListItemIcon>{icons.get(variant)}</StyledListItemIcon>
            )}
        </StyledListItem>
    );
};

export default ChangesListItem;
