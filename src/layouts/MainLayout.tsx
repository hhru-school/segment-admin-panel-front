import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import Logo from 'components/Logo';
import Main from 'components/Main';
import NavMenu from 'components/NavMenu';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Wrapper>
            <AppBar>
                <Container disableGutters>
                    <Stack direction="row" justifyContent="space-between" spacing={3}>
                        <Stack direction="row" alignItems="center">
                            <Logo />
                            <Typography
                                variant="h5"
                                component="h1"
                                noWrap
                                sx={{ display: { xs: 'none', sm: 'block' }, ml: 1.5 }}
                            >
                                Поля пользователей
                            </Typography>
                        </Stack>
                        <NavMenu
                            links={[
                                { label: 'Слои', href: '/layers' },
                                { label: 'Поля', href: '/fields' },
                                { label: 'Экраны', href: '/screens' },
                                { label: 'Сегменты', href: '/segments' },
                            ]}
                        />
                    </Stack>
                </Container>
            </AppBar>
            <Main>
                <ToolbarSpace />
                <Container disableGutters>
                    <Stack spacing={4}>{children}</Stack>
                </Container>
            </Main>
        </Wrapper>
    );
};

export default MainLayout;
