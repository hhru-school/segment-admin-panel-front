import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import Logo from 'components/Logo';
import Main from 'components/Main';
import NavMenu from 'components/NavMenu';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface HomeLayoutProps {
    children?: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <Wrapper>
            <AppBar>
                <Container sx={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                        <Logo />
                        <Typography
                            variant="h5"
                            component="h1"
                            noWrap
                            sx={{ display: { xs: 'none', sm: 'block' }, ml: 1.5 }}
                        >
                            Поля пользователей
                        </Typography>
                    </Box>
                    <NavMenu
                        links={[
                            { label: 'Слои', href: '/layers' },
                            { label: 'Поля', href: '/fields' },
                            { label: 'Экраны', href: '/screens' },
                            { label: 'Сегменты', href: '/segments' },
                        ]}
                    />
                </Container>
            </AppBar>
            <Main>
                <Container disableGutters>
                    <ToolbarSpace />
                    {children}
                </Container>
            </Main>
        </Wrapper>
    );
};

export default HomeLayout;
