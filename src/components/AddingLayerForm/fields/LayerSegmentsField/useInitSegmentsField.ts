import { useEffect, useState } from 'react';
import { useField, useForm } from 'react-final-form';

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
    const isNeedLoad = value === null && layer !== null;
    const [loading, setLoading] = useState(isNeedLoad);
    const { setAlert } = useErrorAlert();
    const form = useForm();

    useEffect(() => {
        if (isNeedLoad) {
            api.get<LayerSegments>(`/layers/${layer.id}/segments`)
                .then(({ data: { segments } }) => {
                    form.change(FieldName.Segments, getInitialValue(segments));
                })
                .catch((error) => {
                    const apiError = apiErrorHandler(error);

                    if (apiError?.code === 404) {
                        setAlert(`Не удалось найти слой с ID=${layer.id}. Обратитесь к администратору.`);
                    } else {
                        setAlert(apiError.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isNeedLoad, layer, form, setAlert]);

    return loading;
};

export default useInitSegmentsFieldValue;
