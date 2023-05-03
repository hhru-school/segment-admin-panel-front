import { useNavigate, useResolvedPath } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';

interface NavMenuItemProps {
    href: string;
    label: string;
}

const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'selected' })<{ selected: boolean }>(
    ({ theme, selected }) => ({
        color: theme.palette.common.white,
        backgroundColor: 'transparent',
        borderRadius: '8px',
        transition: theme.transitions.create(['color', 'background-color']),

        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.5),
        },

        ...(selected && {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.text.primary,

            '&:hover': {
                backgroundColor: theme.palette.common.white,
            },
        }),
    })
);

const NavMenuItem: React.FC<NavMenuItemProps> = ({ label, href }) => {
    const to = useResolvedPath(href);
    const navigate = useNavigate();

    const handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (event) => {
        event.preventDefault();

        if (to.pathname !== location.pathname) {
            navigate(href);
        }
    };

    return (
        <StyledButton href={href} onClick={handleClick} size="small" selected={to.pathname === location.pathname}>
            {label}
        </StyledButton>
    );
};

export default NavMenuItem;
