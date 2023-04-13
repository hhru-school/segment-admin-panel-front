import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import logo from 'components/Logo/logo.svg';

const StyledImg = styled('img')(({ theme }) => ({
    width: 40,
    height: 40,
    [theme.breakpoints.up('sm')]: {
        width: 50,
        height: 50,
    },
}));

const Logo: React.FC = () => {
    return (
        <Link href="/" sx={{ lineHeight: 0 }}>
            <StyledImg src={logo} alt="logo" />
        </Link>
    );
};

export default Logo;
