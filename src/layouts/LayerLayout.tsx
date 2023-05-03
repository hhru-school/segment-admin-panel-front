import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from 'components/AppBar';
import BackButton from 'components/BackButton';
import Drawer from 'components/Drawer';
import DrawerBody from 'components/Drawer/DrawerBody';
import DrawerButton from 'components/Drawer/DrawerButton';
import DrawerOption, { DrawerOptionProps } from 'components/Drawer/DrawerOption';
import Main from 'components/Main';
import ToolbarSpace from 'components/ToolbarSpace';
import Wrapper from 'components/Wrapper';

interface LayerLayoutProps {
    drawerOptions: Omit<DrawerOptionProps, 'onClick'>[];
    children?: React.ReactNode;
    title?: React.ReactNode;
    loading?: boolean;
}

const drawerWidth = 290;

const LayerLayout: React.FC<LayerLayoutProps> = ({ children, title, drawerOptions, loading }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isSmallWindow = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = useCallback(() => {
        setOpen(!open);
    }, [open]);

    useEffect(() => {
        // показывать боковою панель всегда закрытой при изменении размера экрана
        if (!isSmallWindow && open) {
            handleDrawerToggle();
        }
    }, [open, isSmallWindow, handleDrawerToggle]);

    return (
        <Wrapper>
            <AppBar>
                <Stack direction="row" spacing={1}>
                    <BackButton href="/" tooltipTitle="На главную" />
                    {isSmallWindow && <DrawerButton onClick={handleDrawerToggle} />}
                </Stack>
                <Box sx={{ ml: 3 }}>
                    <Typography variant="h5" noWrap component="h1">
                        {loading ? <Skeleton width={250} sx={{ bgcolor: 'grey.600' }} /> : title}
                    </Typography>
                </Box>
            </AppBar>
            <Drawer
                open={open}
                variant={isSmallWindow ? 'temporary' : 'permanent'}
                width={drawerWidth}
                onClose={handleDrawerToggle}
            >
                <DrawerBody>
                    {drawerOptions.map(({ href, primaryText, secondaryText, icon }) => (
                        <DrawerOption
                            key={href}
                            href={href}
                            icon={icon}
                            primaryText={primaryText}
                            secondaryText={secondaryText}
                            onClick={handleDrawerToggle}
                        />
                    ))}
                </DrawerBody>
            </Drawer>
            <Main>
                <ToolbarSpace />
                <Container disableGutters>{children}</Container>
            </Main>
        </Wrapper>
    );
};

export default LayerLayout;
