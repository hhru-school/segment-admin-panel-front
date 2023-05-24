import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
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
                    <Box sx={{ pt: 5, pb: 4 }}>{children}</Box>
                </Container>
            </Main>
        </Wrapper>
    );
};

export default FormLayout;
