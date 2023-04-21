import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import StableIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ExperimentalIcon from '@mui/icons-material/ScienceOutlined';
import Chip from '@mui/material/Chip';

import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { LayerStatus } from 'models/layersList';

interface LayerStatusChipProps {
    status: LayerStatus;
}

const LayerStatusChip: React.FC<LayerStatusChipProps> = ({ status }) => {
    switch (status) {
        case 'ARCHIVED':
            return <Chip icon={<ArchivedIcon />} label="Архивный" variant="outlined" />;
        case 'EXPERIMENTAL':
            return <Chip icon={<ExperimentalIcon />} label="Пробный" variant="outlined" color="warning" />;
        case 'STABLE':
            return <Chip icon={<StableIcon />} label="Базовый" variant="outlined" color="success" />;
    }
    return exhaustiveCheck(status);
};

export default LayerStatusChip;
