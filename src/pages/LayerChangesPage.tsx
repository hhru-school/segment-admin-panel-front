import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';

import EntryPointsChanges from 'components/EntryPointsChanges';
import FieldsChanges from 'components/FieldsChanges';
import FieldsVisibilityChanges from 'components/FieldsVisibilityChanges';
import SegmentsChanges from 'components/SegmentsChanges';
import Title from 'components/Title';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchLayerChanges, selectLayerChangesError, reset } from 'models/layerChanges';

const LayerChangesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { layerId } = useParams();
    const { setAlert } = useErrorAlert();
    const error = useAppSelector(selectLayerChangesError, shallowEqual);

    useEffect(() => {
        void dispatch(fetchLayerChanges(Number(layerId)));
        return () => {
            dispatch(reset());
        };
    }, [layerId, dispatch]);

    useEffect(() => {
        if (error !== null && error.code !== 404) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    return (
        <>
            <Title>Изменения в слое</Title>
            <SegmentsChanges />
            <EntryPointsChanges />
            <FieldsChanges />
            <FieldsVisibilityChanges />
        </>
    );
};

export default LayerChangesPage;
