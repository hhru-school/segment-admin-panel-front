import Tooltip from '@mui/material/Tooltip';

import QuestionRequiredIcon from 'components/QuestionStatus/QuestionRequiredIcon';
import QuestionStatusWrapper from 'components/QuestionStatus/QuestionStatusWrapper';

interface QuestionRequiredElementProps {
    required?: boolean;
    changed?: boolean;
}

const QuestionRequiredElement: React.FC<QuestionRequiredElementProps> = ({ required, changed }) => {
    if (changed) {
        return (
            <Tooltip title="Изменено">
                <QuestionStatusWrapper changed={changed}>
                    <QuestionRequiredIcon required={required} />
                </QuestionStatusWrapper>
            </Tooltip>
        );
    }
    return (
        <QuestionStatusWrapper changed={changed}>
            <QuestionRequiredIcon required={required} />
        </QuestionStatusWrapper>
    );
};

export default QuestionRequiredElement;
