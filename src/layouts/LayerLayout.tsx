import { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
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

type LayerLayoutProps = {
    drawerOptions: Omit<DrawerOptionProps, 'onClick'>[];
    children?: React.ReactNode;
    title?: React.ReactNode;
};

const drawerWidth = 290;

const LayerLayout: React.FC<LayerLayoutProps> = ({ children, title, drawerOptions }) => {
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
                <Typography variant="h6" noWrap component="h1" sx={{ ml: 3 }}>
                    {title}
                </Typography>
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
            <Main drawerWidth={drawerWidth}>
                <ToolbarSpace />
                <Container disableGutters>{children}</Container>
            </Main>
        </Wrapper>
    );
};

export default LayerLayout;
export type { LayerLayoutProps };
