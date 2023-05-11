import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { QuestionType } from 'models/fields';

import LightenChip, { LightenChipProps } from 'components/LightenChip';

interface QuestionTypeChipProps extends Pick<LightenChipProps, 'size'> {
    type: QuestionType;
}

const QuestionTypeChip: React.FC<QuestionTypeChipProps> = ({ type, size }) => {
    switch (type) {
        case 'SINGLE_CHOICE':
            return <LightenChip label="Один ответ" color="info" size={size} />;
        case 'MULTI_SELECT':
            return <LightenChip label="Несколько ответов" color="info" size={size} />;
        case 'NONE':
            return null;
    }
    return exhaustiveCheck(type);
};

export default QuestionTypeChip;
