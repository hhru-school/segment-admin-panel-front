import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import BackButton from 'components/BackButton';
import Main from 'components/Main';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface DetailsLayoutProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
}

const DetailsLayout: React.FC<DetailsLayoutProps> = ({ children, title }) => {
    return (
        <Wrapper>
            <AppBar>
                <BackButton href=".." tooltipTitle="Назад" />
                <Typography variant="h6" noWrap component="h1" sx={{ ml: 3 }}>
                    {title}
                </Typography>
            </AppBar>
            <Main>
                <ToolbarSpace />
                <Container>{children}</Container>
            </Main>
        </Wrapper>
    );
};

export default DetailsLayout;
