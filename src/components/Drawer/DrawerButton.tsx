import MenuIcon from '@mui/icons-material/Menu';
import { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import IconButton from 'components/IconButton';

const DrawerButton: React.FC<Pick<IconButtonProps, 'onClick'>> = ({ onClick }) => {
    return (
        <Tooltip title="Меню" disableInteractive>
            <IconButton size="small" onClick={onClick}>
                <MenuIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DrawerButton;
