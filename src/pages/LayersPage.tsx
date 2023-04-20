import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { redirect } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DataCard from 'components/DataCard';
import DataCardContent from 'components/DataCard/DataCardContent';
import LayersTable from 'components/LayersTable';
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
        if (error != null) {
            if (error.code === 404) {
                redirect('/not-found');
            } else {
                setAlert(error.message);
            }
        }
    }, [error, setAlert]);

    return (
        <DataCard title="Слои">
            <DataCardContent>
                <Box sx={{ mb: 2, ml: 'auto', width: 'max-content' }}>
                    <Button startIcon={<AddIcon />} variant="contained" disabled={isLoading}>
                        Создать новый слой
                    </Button>
                </Box>
                <LayersTable />
            </DataCardContent>
        </DataCard>
    );
};

export default LayersPage;
