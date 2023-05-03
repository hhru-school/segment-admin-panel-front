import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';

import IconButton from 'components/IconButton';

interface BackButtonProps {
    href: string;
    tooltipTitle: string;
    relative?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, tooltipTitle }) => {
    return (
        <Tooltip title={tooltipTitle} disableInteractive>
            <IconButton component={Link} to={href} relative="path" edge="start" size="small" color="inherit">
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
    );
};

export default BackButton;
