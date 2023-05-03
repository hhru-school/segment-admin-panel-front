import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import logo from 'components/Logo/hh_logo.svg';

const StyledImg = styled('img')(({ theme }) => ({
    width: 36,
    height: 36,
    [theme.breakpoints.up('sm')]: {
        width: 48,
        height: 48,
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
