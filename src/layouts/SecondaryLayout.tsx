import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import BackButton from 'components/BackButton';
import Main from 'components/Main';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface DetailsLayoutProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    loading?: boolean;
    backHref?: string;
    backTitle?: string;
    ContainerProps?: ContainerProps;
}

const DetailsLayout: React.FC<DetailsLayoutProps> = ({
    children,
    title,
    loading,
    backHref = '..',
    backTitle = 'Назад',
    ContainerProps,
}) => {
    return (
        <Wrapper>
            <AppBar>
                <BackButton href={backHref} tooltipTitle={backTitle} />
                <Box sx={{ ml: 3 }}>
                    <Typography variant="h5" noWrap component="h1">
                        {loading ? <Skeleton width={250} sx={{ bgcolor: 'grey.600' }} /> : title}
                    </Typography>
                </Box>
            </AppBar>
            <Main>
                <ToolbarSpace />
                <Container disableGutters {...ContainerProps}>
                    {children}
                </Container>
            </Main>
        </Wrapper>
    );
};

export default DetailsLayout;
