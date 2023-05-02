import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface QuestionRequiredIconProps {
    required?: boolean;
}

const QuestionRequiredIcon: React.FC<QuestionRequiredIconProps> = ({ required }) => {
    if (required) {
        return <CheckBoxIcon color="primary" />;
    }

    return <CheckBoxOutlineBlankIcon color="action" />;
};

export default QuestionRequiredIcon;
