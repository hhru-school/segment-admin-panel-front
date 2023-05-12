import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { AnswerType } from 'models/fields';

import LightenChip, { LightenChipProps } from 'components/LightenChip';

interface AnswerTypeChipProps extends Pick<LightenChipProps, 'size'> {
    type: AnswerType;
}

const AnswerTypeChip: React.FC<AnswerTypeChipProps> = ({ type, size }) => {
    switch (type) {
        case 'POSITIVE':
            return <LightenChip label="Положительный" color="success" size={size} />;
        case 'NEGATIVE':
            return <LightenChip label="Отрицательный" color="error" size={size} />;
        case 'NEUTRAL':
            return <LightenChip label="Нейтральный" size={size} />;
    }
    return exhaustiveCheck(type);
};

export default AnswerTypeChip;
