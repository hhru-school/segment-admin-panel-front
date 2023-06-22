import { useEffect, useState } from 'react';
import { useForm } from 'react-final-form';
import { getIn } from 'final-form';

import api, { apiErrorHandler } from 'api';
import { NewLayer, SegmentInputValue } from 'components/AddingLayerForm/types';
import useErrorAlert from 'hooks/useErrorAlert';
import { SegmentDetails } from 'types/segment';

const useInitSegmentDetails = (name: string): boolean => {
    const { setAlert } = useErrorAlert();
    const form = useForm<NewLayer>();
    const { values } = form.getState();
    const parentLayerId = getIn(values, 'parentLayer.id') as number | '';
    const segment = getIn(values, `segments.${name}`) as SegmentInputValue | null;

    if (!parentLayerId) {
        throw new Error('Не задан слой.');
    }
    if (!segment) {
        throw new Error('Не задан сегмент.');
    }

    const isNeedLoad = !segment.fields || !segment.entryPoints;
    const [loading, setLoading] = useState(isNeedLoad);

    useEffect(() => {
        if (isNeedLoad) {
            api.get<SegmentDetails>(`/layers/${parentLayerId}/segments/${segment.id}/details`)
                .then(({ data }) => {
                    form.mutators.initSegmentDetails(name, data);
                })
                .catch((error) => {
                    const apiError = apiErrorHandler(error);

                    if (apiError?.code === 404) {
                        setAlert(
                            `Не удалось найти слой с ID=${parentLayerId} или сегмент с ID=${segment.id} в этом слое. Обратитесь к администратору.`
                        );
                    } else {
                        setAlert(apiError.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [name, isNeedLoad, parentLayerId, segment.id, form.mutators, setAlert]);

    return loading;
};

export default useInitSegmentDetails;
