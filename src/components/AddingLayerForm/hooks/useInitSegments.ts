import { useEffect, useState } from 'react';
import { useField, useForm } from 'react-final-form';

import api, { apiErrorHandler } from 'api';
import { NewLayer } from 'components/AddingLayerForm/types';
import useErrorAlert from 'hooks/useErrorAlert';
import { LayerSegments } from 'types/segment';

const useInitSegments = (): boolean => {
    const {
        input: { value },
    } = useField<NewLayer['segments']>('segments', { subscription: { value: true }, allowNull: true });
    const {
        input: { value: layer },
    } = useField<NewLayer['parentLayer']>('parentLayer', { subscription: { value: true }, allowNull: true });

    if (layer === null) {
        throw new Error('Не задан слой.');
    }

    const form = useForm();
    const { setAlert } = useErrorAlert();

    const isNeedLoad = value === null;
    const [loading, setLoading] = useState(isNeedLoad);

    useEffect(() => {
        if (isNeedLoad) {
            api.get<LayerSegments>(`/layers/${layer.id}/segments`)
                .then(({ data: { segments } }) => {
                    form.mutators.initSegments(segments);
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

export default useInitSegments;
