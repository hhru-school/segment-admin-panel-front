import { useCallback, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { isApiError } from 'api';
import LayerSegmentsTable from 'components/LayerSegmentsTable';
import SearchForm from 'components/SearchForm';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import {
    fetchLayerSegments,
    reset,
    setSearchString,
    selectCurrentLayerSegmentsLoadingStatus,
    selectCurrentLayerSegments,
} from 'models/currentLayerSegments';

const LayerSegmentsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { setAlert } = useErrorAlert();
    const { layerId } = useParams();
    const segments = useAppSelector(selectCurrentLayerSegments, shallowEqual);
    const isLoading = useAppSelector(selectCurrentLayerSegmentsLoadingStatus);

    const handleSearch = useCallback(
        (searchQuery: string) => {
            if (layerId !== null) {
                void dispatch(fetchLayerSegments({ layerId: Number(layerId), searchQuery }));
                dispatch(setSearchString(searchQuery || ''));
            }
        },
        [layerId, dispatch]
    );

    useEffect(() => {
        void dispatch(fetchLayerSegments({ layerId: Number(layerId) }))
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
    }, [layerId, dispatch, navigate, setAlert]);

    if (!isLoading && segments === null) {
        return (
            <>
                <Stack direction="row" alignItems="center" spacing={4}>
                    <Box sx={{ flexBasis: 140 }}>
                        <Typography component="h2" variant="h5">
                            Сегменты
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                            <SearchForm disabled onSubmit={handleSearch} />
                        </Box>
                    </Box>
                </Stack>
                <Alert severity="warning">
                    Нет данных! Проверьте подключение к интернету и повторите попытку или обратитесь к администратору.
                </Alert>
            </>
        );
    }

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={4}>
                <Box sx={{ flexBasis: 140 }}>
                    <Typography component="h2" variant="h5">
                        Сегменты
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                        <SearchForm disabled={isLoading} onSubmit={handleSearch} />
                    </Box>
                </Box>
            </Stack>
            <LayerSegmentsTable />
        </>
    );
};

export default LayerSegmentsPage;
