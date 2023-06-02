import { AnswersType, AnswersTypes } from 'types/field';

import LightenChip, { LightenChipProps } from 'components/LightenChip';

interface AnswersTypeChipProps extends Pick<LightenChipProps, 'size'> {
    type: AnswersType;
}

const AnswersTypeChip: React.FC<AnswersTypeChipProps> = ({ type, size }) => {
    switch (type) {
        case AnswersTypes.SingleChoice:
            return <LightenChip label="Один ответ" color="info" size={size} />;
        case AnswersTypes.MultiSelect:
            return <LightenChip label="Несколько ответов" color="info" size={size} />;
        default:
            return null;
    }
};

export default AnswersTypeChip;
