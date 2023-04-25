import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import StableIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ExperimentalIcon from '@mui/icons-material/ScienceOutlined';
import Chip, { ChipProps } from '@mui/material/Chip';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { LayerStatus } from 'models/layersList';

interface LayerStatusChipProps extends Pick<ChipProps, 'variant'> {
    status: LayerStatus;
}

const LayerStatusChip: React.FC<LayerStatusChipProps> = ({ status, variant }) => {
    switch (status) {
        case 'ARCHIVED':
            return <Chip icon={<ArchivedIcon />} label="Архивный" variant={variant} />;
        case 'EXPERIMENTAL':
            return <Chip icon={<ExperimentalIcon />} label="Пробный" variant={variant} color="warning" />;
        case 'STABLE':
            return <Chip icon={<StableIcon />} label="Базовый" variant={variant} color="success" />;
    }
    return exhaustiveCheck(status);
};

export default LayerStatusChip;
