import MenuIcon from '@mui/icons-material/Menu';
import { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import IconButton from 'components/IconButton';

type DrawerButtonProps = Pick<IconButtonProps, 'onClick'>;

const DrawerButton: React.FC<DrawerButtonProps> = ({ onClick }) => {
    return (
        <Tooltip title="Меню" disableInteractive>
            <IconButton size="small" onClick={onClick}>
                <MenuIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DrawerButton;
export type { DrawerButtonProps };
