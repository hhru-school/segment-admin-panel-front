import { useResolvedPath } from 'react-router-dom';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';

type DrawerOptionProps = {
    href: string;
    primaryText: string;
    icon?: React.ReactNode;
    secondaryText?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
};

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    transition: theme.transitions.create(['background-color', 'border-left', 'padding-left'], {
        duration: theme.transitions.duration.shortest,
    }),
    '& .MuiListItemIcon-root': {
        minWidth: theme.spacing(6),
    },
    '&.Mui-selected': {
        paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
})) as typeof ListItemButton;

const DrawerOption: React.FC<DrawerOptionProps> = ({ href, primaryText, icon, secondaryText, onClick }) => {
    const to = useResolvedPath(href);

    return (
        <ListItem disablePadding>
            <StyledListItemButton
                component={Link}
                href={href}
                selected={to.pathname === location.pathname}
                onClick={onClick}
                disableRipple
            >
                {icon != null && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={primaryText} secondary={secondaryText} />
            </StyledListItemButton>
        </ListItem>
    );
};

export default DrawerOption;
export type { DrawerOptionProps };
