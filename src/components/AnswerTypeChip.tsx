import { AnswerType, AnswerTypes } from 'types/field';

import LightenChip, { LightenChipProps } from 'components/LightenChip';

interface AnswerTypeChipProps extends Pick<LightenChipProps, 'size'> {
    type: AnswerType;
}

const AnswerTypeChip: React.FC<AnswerTypeChipProps> = ({ type, size }) => {
    switch (type) {
        case AnswerTypes.Positive:
            return <LightenChip label="Положительный" color="success" size={size} />;
        case AnswerTypes.Negative:
            return <LightenChip label="Отрицательный" color="error" size={size} />;
        case AnswerTypes.Neutral:
            return <LightenChip label="Нейтральный" size={size} />;
        default:
            return null;
    }
};

export default AnswerTypeChip;
