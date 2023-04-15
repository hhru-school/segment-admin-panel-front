import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import ToolbarSpace from 'components/ToolbarSpace';

import DrawerWrapper from 'components/Drawer/DrawerWrapper';

interface DrawerProps extends Pick<MuiDrawerProps, 'children' | 'onClose' | 'open' | 'variant'> {
    width?: number;
}

const DEFAULT_DRAWER_WIDTH = 240;

const StyledMuiDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'width' })<DrawerProps>(
    ({ width }) => ({
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width || DEFAULT_DRAWER_WIDTH },
    })
);

const Drawer: React.FC<DrawerProps> = ({ children, open, width = DEFAULT_DRAWER_WIDTH, variant, onClose }) => {
    return (
        <DrawerWrapper drawerWidth={width}>
            <StyledMuiDrawer
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                variant={variant}
                width={width}
            >
                <ToolbarSpace />
                {children}
            </StyledMuiDrawer>
        </DrawerWrapper>
    );
};
export default Drawer;
export { DEFAULT_DRAWER_WIDTH };
