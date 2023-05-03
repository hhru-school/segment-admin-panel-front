import Stack from '@mui/material/Stack';

import NavMenuItem from 'components/NavMenu/NavMenuItem';

interface Link {
    label: string;
    href: string;
}

interface NavMenuProps {
    links: Link[];
}

const NavMenu: React.FC<NavMenuProps> = ({ links }) => {
    return (
        <Stack component="nav" direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
            {links.map(({ label, href }) => (
                <NavMenuItem key={label} label={label} href={href} />
            ))}
        </Stack>
    );
};
export default NavMenu;
