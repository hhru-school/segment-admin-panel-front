import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import StableIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ExperimentalIcon from '@mui/icons-material/ScienceOutlined';
import Chip, { ChipProps } from '@mui/material/Chip';

import { LayerState, LayerStates } from 'types/layer';

interface LayerStatusChipProps extends Pick<ChipProps, 'variant'> {
    status?: LayerState;
}

const LayerStatusChip: React.FC<LayerStatusChipProps> = ({ status = LayerStates.Stable, variant }) => {
    switch (status) {
        case LayerStates.Archived:
            return <Chip icon={<ArchivedIcon />} label="Архивный" variant={variant} />;
        case LayerStates.Experimental:
            return <Chip icon={<ExperimentalIcon />} label="Пробный" variant={variant} color="warning" />;
        case LayerStates.Stable:
            return <Chip icon={<StableIcon />} label="Базовый" variant={variant} color="success" />;
        default:
            return null;
    }
};

export default LayerStatusChip;
