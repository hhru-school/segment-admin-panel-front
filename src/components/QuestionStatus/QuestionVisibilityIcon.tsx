import ShowIcon from '@mui/icons-material/Visibility';
import HideIcon from '@mui/icons-material/VisibilityOff';

import { QuestionVisibilityStatus } from 'models/layerChanges';

import HidePrefilledIcon from 'components/QuestionStatus/HidePrefilledIcon';

export interface QuestionVisibilityIconProps {
    variant: QuestionVisibilityStatus;
}

const QuestionVisibilityIcon: React.FC<QuestionVisibilityIconProps> = ({ variant }) => {
    if (variant === 'HIDE_PREFILLED') {
        return <HidePrefilledIcon color="action" />;
    }
    if (variant === 'HIDE') {
        return <HideIcon color="action" />;
    }
    return <ShowIcon color="primary" />;
};

export default QuestionVisibilityIcon;
