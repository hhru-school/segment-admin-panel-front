import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ExpandButtonProps extends IconButtonProps {
    expand?: boolean;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ onClick, color, expand = false }) => {
    return (
        <IconButton onClick={onClick} size="small" color={color} edge="start">
            {expand ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>
    );
};

export default ExpandButton;
