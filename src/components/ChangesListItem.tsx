import CreatedIcon from '@mui/icons-material/AddCircleOutline';
import ArchiveIcon from '@mui/icons-material/RemoveCircleOutline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { lightGreen, red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

const enum Variant {
    CREATED = 'created',
    ARCHIVE = 'archive',
    DEFAULT = 'default',
}

interface ChangesListItemProps {
    text?: string;
    variant?: `${Variant}`;
}

const StyledListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'variant' })<ChangesListItemProps>(
    ({ theme, variant }) => ({
        padding: '9px 8px 9px 16px',
        alignItems: 'center',
        borderRadius: theme.spacing(0.5),
        '&:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
        ...(variant === Variant.CREATED && {
            color: lightGreen[900],
            backgroundColor: alpha(lightGreen.A400, 0.1),
        }),
        ...(variant === Variant.ARCHIVE && {
            color: red[900],
            backgroundColor: alpha(red.A400, 0.1),
        }),
    })
);

const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: 0,
    padding: '5px',
    marginLeft: '8px',
    color: 'inherit',
});

const StyledListItemText = styled(ListItemText)({
    margin: 0,
});

const icons = new Map<ChangesListItemProps['variant'], JSX.Element>([
    [Variant.CREATED, <CreatedIcon sx={{ height: 20, width: 20 }} />],
    [Variant.ARCHIVE, <ArchiveIcon sx={{ height: 20, width: 20 }} />],
]);

const ChangesListItem: React.FC<ChangesListItemProps> = ({ text, variant }) => {
    return (
        <StyledListItem variant={variant}>
            <StyledListItemText primary={text} />
            {(variant === Variant.CREATED || variant === Variant.ARCHIVE) && (
                <StyledListItemIcon>{icons.get(variant)}</StyledListItemIcon>
            )}
        </StyledListItem>
    );
};

export default ChangesListItem;
