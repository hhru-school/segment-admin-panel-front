import { QuestionType, QuestionTypes } from 'types/field';

import LightenChip, { LightenChipProps } from 'components/LightenChip';

interface QuestionTypeChipProps extends Pick<LightenChipProps, 'size'> {
    type: QuestionType;
}

const QuestionTypeChip: React.FC<QuestionTypeChipProps> = ({ type, size }) => {
    switch (type) {
        case QuestionTypes.SingleChoice:
            return <LightenChip label="Один ответ" color="info" size={size} />;
        case QuestionTypes.MultiSelect:
            return <LightenChip label="Несколько ответов" color="info" size={size} />;
        default:
            return null;
    }
};

export default QuestionTypeChip;
