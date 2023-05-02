import { QuestionVisibilityStatus } from 'models/layerChanges';

import QuestionStatusTooltip from 'components/QuestionStatus/QuestionStatusToolTip';
import QuestionStatusWrapper from 'components/QuestionStatus/QuestionStatusWrapper';
import QuestionVisibilityIcon from 'components/QuestionStatus/QuestionVisibilityIcon';

interface QuestionVisibilityElementProps {
    value: QuestionVisibilityStatus;
    previousValue?: QuestionVisibilityStatus;
}

const QuestionVisibilityElement: React.FC<QuestionVisibilityElementProps> = ({ value, previousValue }) => {
    return (
        <QuestionStatusTooltip value={value} previousValue={previousValue}>
            <QuestionStatusWrapper changed={previousValue !== undefined && previousValue !== value}>
                <QuestionVisibilityIcon variant={value} />
            </QuestionStatusWrapper>
        </QuestionStatusTooltip>
    );
};

export default QuestionVisibilityElement;
