import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import Logo from 'components/Logo';
import Main from 'components/Main';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface HomeLayoutProps {
    children?: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <Wrapper>
            <AppBar>
                <Container disableGutters>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Logo />
                        <Typography variant="h6" noWrap component="h1">
                            Админ-панель полей пользователей
                        </Typography>
                    </Stack>
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
