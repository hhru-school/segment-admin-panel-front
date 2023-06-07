import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ContentBox from 'components/ContentBox';
import LayerStatusChip from 'components/LayerStatusChip';
import ParentsLayersTable from 'components/ParentsLayersTable';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayer, selectCurrentLayerLoadingStatus } from 'models/currentLayer';

const LayerInfoPage: React.FC = () => {
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const layer = useAppSelector(selectCurrentLayer, shallowEqual);

    if (isLoading) {
        return (
            <>
                <Typography component="h2" variant="h5">
                    Основная информация
                </Typography>
                <ContentBox loading={isLoading}>
                    <LayerStatusChip />
                </ContentBox>
                <ContentBox title="Описание" loading={isLoading} skeletonWidth="100%">
                    <Typography>.</Typography>
                </ContentBox>
                <ContentBox title="Дата создания" loading={isLoading} skeletonWidth="100%">
                    <Typography>.</Typography>
                </ContentBox>
                <ContentBox title="Родительский слой" loading={isLoading} skeletonWidth="100%" skeletonHeight={114} />
            </>
        );
    }

    if (layer === null) {
        return (
            <>
                <Typography component="h2" variant="h5">
                    Основная информация
                </Typography>
                <Alert severity="warning">
                    Нет данных! Проверьте подключение к интернету и повторите попытку или обратитесь к администратору.
                </Alert>
            </>
        );
    }

    return (
        <>
            <Typography component="h2" variant="h5">
                Основная информация
            </Typography>
            <Box sx={{ alignSelf: 'flex-start' }}>
                <LayerStatusChip status={layer.layerStatus} />
            </Box>
            <ContentBox title="Описание">
                <Typography sx={{ textIndent: 32 }}>{layer.description}</Typography>
            </ContentBox>
            <ContentBox title="Дата создания">
                <Typography sx={{ textIndent: 32 }}>
                    {new Date(layer.createTime).toLocaleString('ru', {
                        dateStyle: 'long',
                        timeStyle: 'medium',
                    })}
                </Typography>
            </ContentBox>
            <ContentBox title="Родительский слой">
                <ParentsLayersTable />
            </ContentBox>
        </>
    );
};

export default LayerInfoPage;
