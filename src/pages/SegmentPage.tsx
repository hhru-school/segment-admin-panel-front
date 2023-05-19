import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { isApiError } from 'api';
import ContentBox from 'components/ContentBox';
import LightenChip from 'components/LightenChip';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import SecondaryLayout from 'layouts/SecondaryLayout';
import { fetchSegment, reset, selectCurrentSegment, selectCurrentSegmentLoadingStatus } from 'models/currentSegment';

const SegmentPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { segmentId } = useParams();
    const isLoading = useAppSelector(selectCurrentSegmentLoadingStatus);
    const segment = useAppSelector(selectCurrentSegment, shallowEqual);
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        void dispatch(fetchSegment(Number(segmentId)))
            .unwrap()
            .catch((error) => {
                if (isApiError(error)) {
                    if (error.code === 404) {
                        navigate('/not-found', { replace: true });
                    } else {
                        setAlert(error.message);
                    }
                }
            });
        return () => {
            dispatch(reset());
        };
    }, [segmentId, dispatch, navigate, setAlert]);

    return (
        <SecondaryLayout title={segment?.title} backHref="/segments" loading={isLoading}>
            <Box sx={{ pt: 5, pb: 4 }}>
                <Typography component="h2" variant="h5">
                    Описание
                </Typography>
            </Box>
            <ContentBox loading={isLoading} SkeletonProps={{ width: '100%' }} sx={{ pb: 4 }}>
                {segment ? <Typography>{segment.description}</Typography> : <Alert severity="info">Нет данных.</Alert>}
            </ContentBox>
            <Box sx={{ pb: 4 }}>
                <Typography component="h2" variant="h5">
                    Роли
                </Typography>
            </Box>
            <ContentBox loading={isLoading} SkeletonProps={{ width: '100%' }} sx={{ pb: 4 }}>
                {segment ? (
                    <Stack direction="row" gap={3}>
                        {segment.roles.map(({ id, name }) => (
                            <LightenChip key={id} label={name} color="info" />
                        ))}
                    </Stack>
                ) : (
                    <Alert severity="info">Нет данных.</Alert>
                )}
            </ContentBox>
            <Box sx={{ pb: 4 }}>
                <Typography component="h2" variant="h5">
                    Теги
                </Typography>
            </Box>
            <ContentBox loading={isLoading} SkeletonProps={{ width: '100%' }} sx={{ pb: 4 }}>
                {segment ? (
                    <Stack direction="row" gap={3}>
                        {segment.tags.map((name) => (
                            <LightenChip key={name} label={name} color="secondary" />
                        ))}
                    </Stack>
                ) : (
                    <Alert severity="info">Нет данных.</Alert>
                )}
            </ContentBox>
        </SecondaryLayout>
    );
};

export default SegmentPage;
