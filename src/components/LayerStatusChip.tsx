import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import StableIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ExperimentalIcon from '@mui/icons-material/ScienceOutlined';
import Chip, { ChipProps } from '@mui/material/Chip';

import { LayerStatus, LayerStatuses } from 'types/layer';

interface LayerStatusChipProps extends Pick<ChipProps, 'variant'> {
    status?: LayerStatus;
}

const LayerStatusChip: React.FC<LayerStatusChipProps> = ({ status = LayerStatuses.Stable, variant }) => {
    switch (status) {
        case LayerStatuses.Archived:
            return <Chip icon={<ArchivedIcon />} label="Архивный" variant={variant} />;
        case LayerStatuses.Experimental:
            return <Chip icon={<ExperimentalIcon />} label="Пробный" variant={variant} color="warning" />;
        case LayerStatuses.Stable:
            return <Chip icon={<StableIcon />} label="Базовый" variant={variant} color="success" />;
        default:
            return null;
    }
};

export default LayerStatusChip;
