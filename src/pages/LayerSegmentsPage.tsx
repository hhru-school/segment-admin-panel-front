import { useCallback, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LayerSegmentsTable from 'components/LayerSegmentsTable';
import SearchForm from 'components/SearchForm';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { selectCurrentLayerId, selectCurrentLayerLoadingStatus } from 'models/currentLayer';
import {
    fetchLayerSegments,
    reset,
    setSearchString,
    selectCurrentLayerSegmentsError,
    selectCurrentLayerSegmentsLoadingStatus,
} from 'models/currentLayerSegments';

const LayerSegmentsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const { segmentId } = useParams();
    const layerId = useAppSelector(selectCurrentLayerId);
    const layerIsLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const isLoading = useAppSelector(selectCurrentLayerSegmentsLoadingStatus);
    const error = useAppSelector(selectCurrentLayerSegmentsError, shallowEqual);

    const handleSearch = useCallback(
        (searchQuery: string) => {
            if (layerId !== null) {
                void dispatch(fetchLayerSegments({ layerId, searchQuery }));
                dispatch(setSearchString(searchQuery || ''));
            }
        },
        [layerId, dispatch]
    );

    useEffect(() => {
        if (layerId !== null) {
            void dispatch(fetchLayerSegments({ layerId }));
        }
        return () => {
            dispatch(reset());
        };
    }, [layerId, dispatch]);

    useEffect(() => {
        if (error !== null) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    if (segmentId !== undefined) {
        return <Outlet />;
    }

    if (!layerIsLoading && layerId === null) {
        return (
            <>
                <Stack direction="row" alignItems="center" gap={4} sx={{ pt: 5, pb: 4 }}>
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
            <Stack direction="row" alignItems="center" gap={4} sx={{ pt: 5, pb: 4 }}>
                <Box sx={{ flexBasis: 140 }}>
                    <Typography component="h2" variant="h5">
                        Сегменты
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                        <SearchForm disabled={isLoading || layerIsLoading} onSubmit={handleSearch} />
                    </Box>
                </Box>
            </Stack>
            <LayerSegmentsTable />
        </>
    );
};

export default LayerSegmentsPage;
