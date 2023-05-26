import Container, { ContainerProps } from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar';
import BackButton from 'components/BackButton';
import Main from 'components/Main';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface SecondaryLayoutProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    loading?: boolean;
    backHref?: string;
    backTitle?: string;
    ContainerProps?: ContainerProps;
}

const SecondaryLayout: React.FC<SecondaryLayoutProps> = ({
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
                <Container disableGutters {...ContainerProps}>
                    <Stack direction="row" alignItems="center" spacing={4}>
                        <BackButton href={backHref} tooltipTitle={backTitle} />
                        <Typography variant="h5" noWrap component="h1">
                            {loading ? <Skeleton variant="rounded" width={300} sx={{ bgcolor: 'grey.600' }} /> : title}
                        </Typography>
                    </Stack>
                </Container>
            </AppBar>
            <Main>
                <ToolbarSpace />
                <Container disableGutters sx={{ pl: 8 }} {...ContainerProps}>
                    {children}
                </Container>
            </Main>
        </Wrapper>
    );
};

export default SecondaryLayout;
