import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import ContentBox from 'components/ContentBox';
import LayerStatusChip from 'components/LayerStatusChip';
import ParentsLayersTable from 'components/ParentsLayersTable';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayer, selectCurrentLayerLoadingStatus } from 'models/currentLayer';

const InfoPage: React.FC = () => {
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const layer = useAppSelector(selectCurrentLayer, shallowEqual);

    if (!isLoading && layer === null) {
        return (
            <>
                <Title>Основная информация</Title>
                <Subtitle>Описание</Subtitle>
                <ContentBox>
                    <Alert severity="info">Нет данных.</Alert>
                </ContentBox>
                <Subtitle>Дата создания</Subtitle>
                <ContentBox>
                    <Alert severity="info">Нет данных.</Alert>
                </ContentBox>
                <Subtitle>Родительский слой</Subtitle>
                <ContentBox>
                    <Alert severity="info">Нет данных.</Alert>
                </ContentBox>
            </>
        );
    }

    return (
        <>
            <Title>Основная информация</Title>
            <ContentBox loading={isLoading}>
                <LayerStatusChip status={layer?.layerStatus || 'STABLE'} />
            </ContentBox>
            <Subtitle>Описание</Subtitle>
            <ContentBox loading={isLoading} SkeletonProps={{ height: 24, width: '100%' }}>
                <Typography>{layer?.description}</Typography>
            </ContentBox>
            <Subtitle>Дата создания</Subtitle>
            <ContentBox loading={isLoading} SkeletonProps={{ height: 24, width: '100%' }}>
                <Typography>
                    {layer !== null &&
                        new Date(layer.createTime).toLocaleString('ru', {
                            dateStyle: 'long',
                            timeStyle: 'medium',
                        })}
                </Typography>
            </ContentBox>
            <Subtitle>Родительский слой</Subtitle>
            <ContentBox loading={isLoading} SkeletonProps={{ width: '100%' }}>
                <ParentsLayersTable />
            </ContentBox>
        </>
    );
};

export default InfoPage;
