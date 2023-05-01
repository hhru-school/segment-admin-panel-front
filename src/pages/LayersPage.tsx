import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import LayersTable from 'components/LayersTable';
import Title from 'components/Title';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchLayersList, selectLayersListError, selectLayersListLoadingStatus } from 'models/layersList';

const LayersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const isLoading = useAppSelector(selectLayersListLoadingStatus);
    const error = useAppSelector(selectLayersListError, shallowEqual);

    useEffect(() => {
        void dispatch(fetchLayersList());
    }, [dispatch]);

    useEffect(() => {
        if (error !== null) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    return (
        <>
            <Title>Слои</Title>
            <Box sx={{ mb: 2, ml: 'auto', width: 'max-content' }}>
                <Button href="/new/layer" startIcon={<AddIcon />} variant="contained" disabled={isLoading}>
                    Создать новый слой
                </Button>
            </Box>
            <LayersTable />
        </>
    );
};

export default LayersPage;
