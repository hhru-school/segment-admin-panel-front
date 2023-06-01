import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import Chip, { ChipProps } from '@mui/material/Chip';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { ChangeState } from 'types/common';

interface ChangeStatusChipProps extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
    type: ChangeState;
}

const ChangeStatusChip: React.FC<ChangeStatusChipProps> = ({ type, ...rest }) => {
    switch (type) {
        case 'NEW':
            return <Chip icon={<AddIcon />} label="Новый" color="success" {...rest} />;
        case 'CHANGED':
            return <Chip icon={<CachedIcon />} label="Изменен" color="info" {...rest} />;
        case 'NOT_CHANGED':
            return null;
    }
    return exhaustiveCheck(type);
};

export default ChangeStatusChip;
