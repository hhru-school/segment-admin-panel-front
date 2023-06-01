import Chip, { ChipProps } from '@mui/material/Chip';

import { ActiveState } from 'types/common';

interface ActiveStatusChipProps extends Omit<ChipProps, 'label' | 'color'> {
    type: ActiveState;
}

const ActiveStatusChip: React.FC<ActiveStatusChipProps> = ({ type, ...rest }) => {
    if (type === 'DISABLED') {
        return <Chip label="Неактивный" {...rest} />;
    }
    return null;
};

export default ActiveStatusChip;
