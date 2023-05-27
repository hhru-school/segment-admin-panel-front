import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import LayersTable from 'components/LayersTable';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchLayersList, selectLayersListError, selectLayersListLoadingStatus, reset } from 'models/layersList';

const LayersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const isLoading = useAppSelector(selectLayersListLoadingStatus);
    const error = useAppSelector(selectLayersListError, shallowEqual);

    useEffect(() => {
        void dispatch(fetchLayersList());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (error !== null) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" gap={4} sx={{ pt: 5, pb: 4 }}>
                <Typography component="h2" variant="h5">
                    Слои
                </Typography>
                <Box sx={{ flexShrink: 0 }}>
                    <AddButton href="/new/layer" disabled={isLoading}>
                        Новый слой
                    </AddButton>
                </Box>
            </Stack>
            <LayersTable />
        </>
    );
};

export default LayersPage;
