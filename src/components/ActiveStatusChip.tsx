import Chip, { ChipProps } from '@mui/material/Chip';

import { ActiveState, ActiveStates } from 'types/common';

interface ActiveStatusChipProps extends Omit<ChipProps, 'color'> {
    type: ActiveState;
}

const ActiveStatusChip: React.FC<ActiveStatusChipProps> = ({ type, ...rest }) => {
    if (type === ActiveStates.Disabled) {
        return <Chip label="Не активный" {...rest} disabled />;
    }
    return null;
};

export default ActiveStatusChip;
