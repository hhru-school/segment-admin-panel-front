import { shallowEqual } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import DataCard from 'components/DataCard';
import DataCardContent from 'components/DataCard/DataCardContent';
import DataCardSubtitle from 'components/DataCard/DataCardSubtitle';
import LayerStatusChip from 'components/LayerStatusChip';
import ParentsLayersTable from 'components/ParentsLayersTable';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayer, selectCurrentLayerLoadingStatus } from 'models/currentLayer';

const InfoPage: React.FC = () => {
    const layer = useAppSelector(selectCurrentLayer, shallowEqual);
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);

    if (isLoading) {
        return (
            <>
                <DataCard title="Общая информация" margin>
                    <DataCardContent>
                        <Skeleton variant="rounded" height={80} />
                    </DataCardContent>
                </DataCard>
                <DataCard title="Родительский слой">
                    <DataCardContent>
                        <Skeleton variant="rounded" height={80} />
                    </DataCardContent>
                </DataCard>
            </>
        );
    }

    if (layer === null) {
        return (
            <>
                <DataCard title="Общая информация" margin>
                    <DataCardContent>
                        <Typography>Нет данных.</Typography>
                    </DataCardContent>
                </DataCard>
                <DataCard title="Родительский слой">
                    <DataCardContent>
                        <Typography>Нет данных.</Typography>
                    </DataCardContent>
                </DataCard>
            </>
        );
    }

    return (
        <>
            <DataCard title="Общая информация" margin>
                <DataCardContent>
                    <LayerStatusChip status={layer.layerStatus} />
                </DataCardContent>
                <DataCardSubtitle>Описание</DataCardSubtitle>
                <DataCardContent>
                    <Typography>{layer.description}</Typography>
                </DataCardContent>
                <DataCardSubtitle>Дата создания</DataCardSubtitle>
                <DataCardContent>
                    <Typography>
                        {new Date(layer.createTime).toLocaleString('ru', {
                            dateStyle: 'long',
                            timeStyle: 'medium',
                        })}
                    </Typography>
                </DataCardContent>
            </DataCard>
            <DataCard title="Родительский слой">
                <DataCardContent>
                    <ParentsLayersTable />
                </DataCardContent>
            </DataCard>
        </>
    );
};

export default InfoPage;
