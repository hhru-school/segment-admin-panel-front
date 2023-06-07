import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { isApiError } from 'api';
import ContentBox from 'components/ContentBox';
import LayerSegmentEntryPoints from 'components/LayerSegmentEntryPoints';
import LayerSegmentFieldsTable from 'components/LayerSegmentFieldsTable';
import LightenChip from 'components/LightenChip';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import SecondaryLayout from 'layouts/SecondaryLayout';
import { selectCurrentLayerId, selectCurrentLayerLoadingStatus } from 'models/currentLayer';
import {
    fetchLayerSegment,
    selectCurrentLayerSegment,
    selectCurrentLayerSegmentLoadingStatus,
    reset,
} from 'models/currentLayerSegment';

const LayerSegmentsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { setAlert } = useErrorAlert();
    const { segmentId } = useParams();
    const layerIsLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const layerId = useAppSelector(selectCurrentLayerId);
    const segmentIsLoading = useAppSelector(selectCurrentLayerSegmentLoadingStatus);
    const segment = useAppSelector(selectCurrentLayerSegment, shallowEqual);
    const backHref = layerId ? `/layers/${layerId}/segments` : `/layers`;

    useEffect(() => {
        if (layerId !== null) {
            void dispatch(fetchLayerSegment({ layerId, segmentId: Number(segmentId) }))
                .unwrap()
                .catch((error) => {
                    if (isApiError(error)) {
                        if (error?.code === 404) {
                            navigate('/not-found', { replace: true });
                        } else {
                            setAlert(error.message);
                        }
                    }
                });
        }
        return () => {
            dispatch(reset());
        };
    }, [layerId, segmentId, dispatch, navigate, setAlert]);

    if (layerIsLoading || segmentIsLoading) {
        return (
            <SecondaryLayout backHref={backHref} loading>
                <ContentBox title="Описание" loading skeletonWidth="100%">
                    <Typography>.</Typography>
                </ContentBox>
                <ContentBox title="Роли" loading skeletonWidth="100%">
                    <LightenChip />
                </ContentBox>
                <ContentBox title="Теги" loading skeletonWidth="100%">
                    <LightenChip />
                </ContentBox>
                <ContentBox title="Пля" loading skeletonHeight={65 * 4} skeletonWidth="100%" />
                <ContentBox title="Точки входа" loading skeletonHeight={65} skeletonWidth="100%" />
            </SecondaryLayout>
        );
    }

    if (layerId === null || segment === null) {
        return (
            <SecondaryLayout title="Нет данных" backHref={backHref}>
                <Alert severity="warning">
                    Нет данных! Проверьте подключение к интернету и повторите попытку или обратитесь к администратору.
                </Alert>
            </SecondaryLayout>
        );
    }

    return (
        <SecondaryLayout title={`${segment.layerTitle} / ${segment.title}`} backHref={backHref}>
            <ContentBox title="Описание">
                <Typography sx={{ textIndent: 32 }}>{segment.description}</Typography>
            </ContentBox>
            <ContentBox title="Роли">
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {segment.roles.map(({ id, name }) => (
                        <LightenChip key={id} label={name} color="primary" />
                    ))}
                </Stack>
            </ContentBox>
            <ContentBox title="Теги">
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {segment.tags.map((name) => (
                        <LightenChip key={name} label={name} color="secondary" />
                    ))}
                </Stack>
            </ContentBox>
            <ContentBox title="Поля" smallGutters>
                <LayerSegmentFieldsTable />
            </ContentBox>
            <ContentBox title="Точки входа" smallGutters>
                <LayerSegmentEntryPoints />
            </ContentBox>
        </SecondaryLayout>
    );
};

export default LayerSegmentsPage;
