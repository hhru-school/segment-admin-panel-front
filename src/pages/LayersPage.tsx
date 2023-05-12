import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import AddButton from 'components/AddButton';
import AddButtonWrapper from 'components/AddButton/AddButtonWrapper';
import LayersTable from 'components/LayersTable';
import Title from 'components/Title';
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
            <Title>Слои</Title>
            <AddButtonWrapper>
                <AddButton href="/new/layer" disabled={isLoading}>
                    Создать новый слой
                </AddButton>
            </AddButtonWrapper>
            <LayersTable />
        </>
    );
};

export default LayersPage;
