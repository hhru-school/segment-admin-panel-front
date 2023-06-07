import Container, { ContainerProps } from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import Main from 'components/Main';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface FormLayoutProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    ContainerProps?: ContainerProps;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, title, ContainerProps }) => {
    return (
        <Wrapper>
            <AppBar>
                <Container disableGutters {...ContainerProps}>
                    <Typography variant="h5" noWrap component="h1">
                        {title}
                    </Typography>
                </Container>
            </AppBar>
            <Main>
                <ToolbarSpace />
                <Container disableGutters {...ContainerProps}>
                    <Stack spacing={4}>{children}</Stack>
                </Container>
            </Main>
        </Wrapper>
    );
};

export default FormLayout;
