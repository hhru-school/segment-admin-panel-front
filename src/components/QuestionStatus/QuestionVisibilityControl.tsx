import IconButton from '@mui/material/IconButton';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { QuestionVisibilityStatus } from 'models/layerChanges';

import QuestionStatusTooltip from 'components/QuestionStatus/QuestionStatusToolTip';
import QuestionVisibilityIcon from 'components/QuestionStatus/QuestionVisibilityIcon';

export interface QuestionVisibilityHandler {
    (event: React.MouseEvent<HTMLButtonElement>, status: QuestionVisibilityStatus): void;
}

interface QuestionVisibilityControlProps {
    value?: QuestionVisibilityStatus;
    onChange?: QuestionVisibilityHandler;
}

const QuestionVisibilityStatusControl: React.FC<QuestionVisibilityControlProps> = ({ value = 'SHOW', onChange }) => {
    const handleOnChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (onChange === undefined) {
            return;
        }

        switch (value) {
            case 'SHOW':
                onChange(event, 'HIDE');
                return;
            case 'HIDE':
                onChange(event, 'HIDE_PREFILLED');
                return;
            case 'HIDE_PREFILLED':
                onChange(event, 'SHOW');
                return;
        }
        exhaustiveCheck(value);
    };

    return (
        <QuestionStatusTooltip value={value}>
            <IconButton onClick={handleOnChange} color="primary">
                <QuestionVisibilityIcon variant={value} />
            </IconButton>
        </QuestionStatusTooltip>
    );
};

export default QuestionVisibilityStatusControl;
