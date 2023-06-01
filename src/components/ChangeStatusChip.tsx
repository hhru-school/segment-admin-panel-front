import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import Chip, { ChipProps } from '@mui/material/Chip';

import { ChangeState, ChangeStates } from 'types/common';

interface ChangeStatusChipProps extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
    type: ChangeState;
}

const ChangeStatusChip: React.FC<ChangeStatusChipProps> = ({ type, ...rest }) => {
    switch (type) {
        case ChangeStates.New:
            return <Chip icon={<AddIcon />} label="Новый" color="success" {...rest} />;
        case ChangeStates.Changed:
            return <Chip icon={<CachedIcon />} label="Изменен" color="info" {...rest} />;
        default:
            return null;
    }
};

export default ChangeStatusChip;
