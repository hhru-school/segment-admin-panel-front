import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
    const parentSegment = segment?.parentSegment;
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        void dispatch(fetchSegment(Number(segmentId)))
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
        return () => {
            dispatch(reset());
        };
    }, [segmentId, dispatch, navigate, setAlert]);

    if (isLoading) {
        return (
            <SecondaryLayout backHref=".." loading={isLoading}>
                <Stack sx={{ pt: 5 }} spacing={4}>
                    <ContentBox title="Описание" loading={isLoading} skeletonWidth="100%">
                        <Typography>.</Typography>
                    </ContentBox>
                    <ContentBox title="Родительский сегмент" loading={isLoading} skeletonWidth="100%">
                        <Typography>.</Typography>
                    </ContentBox>
                    <ContentBox title="Роли" loading={isLoading} skeletonWidth="100%">
                        <LightenChip />
                    </ContentBox>
                    <ContentBox title="Теги" loading={isLoading} skeletonWidth="100%">
                        <LightenChip />
                    </ContentBox>
                </Stack>
            </SecondaryLayout>
        );
    }

    if (segment === null) {
        return (
            <SecondaryLayout title="Нет данных" backHref="..">
                <Box sx={{ pt: 5 }}>
                    <Alert severity="warning">
                        Нет данных! Проверьте подключение к интернету и повторите попытку или обратитесь к
                        администратору.
                    </Alert>
                </Box>
            </SecondaryLayout>
        );
    }

    return (
        <SecondaryLayout title={segment.title} backHref="/segments">
            <Stack sx={{ pt: 5 }} spacing={4}>
                <ContentBox title="Описание">
                    <Typography sx={{ textIndent: 32 }}>{segment.description}</Typography>
                </ContentBox>
                <ContentBox title="Родительский сегмент">
                    {parentSegment ? (
                        <Box sx={{ ml: 3 }}>
                            <Link href={`/segments/${parentSegment.id}`}>{parentSegment.title}</Link>
                        </Box>
                    ) : (
                        <Typography sx={{ textIndent: 32 }}>Нет родительского сегмента.</Typography>
                    )}
                </ContentBox>
                <ContentBox title="Роли">
                    <Stack direction="row" gap={3}>
                        {segment.roles.map(({ id, name }) => (
                            <LightenChip key={id} label={name} color="info" />
                        ))}
                    </Stack>
                </ContentBox>
                <ContentBox title="Теги">
                    <Stack direction="row" gap={3}>
                        {segment.tags.map((name) => (
                            <LightenChip key={name} label={name} color="secondary" />
                        ))}
                    </Stack>
                </ContentBox>
            </Stack>
        </SecondaryLayout>
    );
};

export default SegmentPage;
