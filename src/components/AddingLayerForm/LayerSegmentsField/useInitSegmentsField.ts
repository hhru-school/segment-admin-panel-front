import { useEffect, useState } from 'react';
import { useField, useForm } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import api, { apiErrorHandler } from 'api';
import { FieldName } from 'components/AddingLayerForm';
import useErrorAlert from 'hooks/useErrorAlert';
import { LayersListItem } from 'types/layer';
import { LayerSegments, LayerSegmentsList, SegmentsFieldValue } from 'types/segment';

const getInitialValue = (segmentsList: LayerSegmentsList): SegmentsFieldValue => {
    return segmentsList.reduce<SegmentsFieldValue>((value, { id, title, roles, tags, activeState }) => {
        value[`id-${id}`] = { id, title, roles, tags, activeState, isNew: false };
        return value;
    }, {});
};

const useInitSegmentsFieldValue = (): boolean => {
    const {
        input: { value },
    } = useField<SegmentsFieldValue | null>(FieldName.Segments, { subscription: { value: true }, allowNull: true });
    const {
        input: { value: layer },
    } = useField<LayersListItem | null>(FieldName.ParentLayer, { subscription: { value: true }, allowNull: true });
    const [loading, setLoading] = useState(!value);
    const navigate = useNavigate();
    const { setAlert } = useErrorAlert();
    const form = useForm();

    useEffect(() => {
        if (layer?.id && !value) {
            api.get<LayerSegments>(`/layers/${layer.id}/segments`)
                .then(({ data: { segments } }) => {
                    form.change(FieldName.Segments, getInitialValue(segments));
                })
                .catch((error) => {
                    const apiError = apiErrorHandler(error);

                    if (apiError?.code === 404) {
                        navigate('/not-found', { replace: true });
                    } else {
                        setAlert(apiError.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [layer?.id, value, form, navigate, setAlert]);

    return loading;
};

export default useInitSegmentsFieldValue;
