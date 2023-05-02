import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import { QuestionVisibilityStatus } from 'models/layerChanges';

interface QuestionStatusToolTipProps extends Pick<TooltipProps, 'children'> {
    value: QuestionVisibilityStatus;
    previousValue?: QuestionVisibilityStatus;
}

const TOOLTIP_TITLES = new Map<QuestionVisibilityStatus, string>([
    ['SHOW', 'Показать'],
    ['HIDE', 'Скрыть'],
    ['HIDE_PREFILLED', 'Скрыть, если заполнено'],
]);

const QuestionStatusTooltip: React.FC<QuestionStatusToolTipProps> = ({ value, previousValue, children }) => {
    return (
        <Tooltip
            title={
                previousValue !== undefined && previousValue !== value
                    ? `${TOOLTIP_TITLES.get(value) || ''}, изменено с "${TOOLTIP_TITLES.get(previousValue) || ''}"`
                    : TOOLTIP_TITLES.get(value)
            }
            disableInteractive
        >
            {children}
        </Tooltip>
    );
};

export default QuestionStatusTooltip;
