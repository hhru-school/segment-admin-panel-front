import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';

import IconButton from 'components/IconButton';

type BackButtonProps = {
    href: string;
    tooltipTitle: string;
    relative?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ href, tooltipTitle }) => {
    return (
        <Tooltip title={tooltipTitle} disableInteractive>
            <IconButton component={Link} to={href} relative="path" edge="start" size="small">
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
    );
};

export default BackButton;
export type { BackButtonProps };
