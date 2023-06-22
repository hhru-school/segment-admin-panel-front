import { useEffect } from 'react';
import { useForm } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Button from '@mui/material/Button';

import { INITIAL_BACK_STATE, PageName } from 'components/AddingLayerForm';
import SegmentInput from 'components/AddingLayerForm/fields/SegmentInput';
import useInitSegmentDetailsField from 'components/AddingLayerForm/hooks/useInitSegmentDetails';
import { isPagesState } from 'components/AddingLayerForm/types';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchFields, reset, selectFieldsError } from 'models/fields';

const SegmentDetailsPage: React.FC = () => {
    const { state, setPageHandler } = useWizard();

    if (!isPagesState(state) || state.segment === null) {
        throw new Error('Не задан сегмент.');
    }

    const dispatch = useAppDispatch();
    const form = useForm();
    const { setAlert } = useErrorAlert();
    const error = useAppSelector(selectFieldsError, shallowEqual);
    const name = `id-${state.segment.id}`;
    const loading = useInitSegmentDetailsField(name);

    const handleCancel = () => {
        form.mutators.resetSegment(`segments.${name}`, state.segment);
        setPageHandler(PageName.Segments, INITIAL_BACK_STATE);
    };

    const handleAddSegment = () => {
        setPageHandler(PageName.Segments, INITIAL_BACK_STATE);
    };

    useEffect(() => {
        void dispatch(fetchFields({ type: 'question' }));
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
            <SegmentInput name={name} loading={loading} />
            <FormActions>
                <Button onClick={handleCancel} variant="outlined" color="inherit" sx={{ minWidth: 112 }}>
                    Отмена
                </Button>
                <Button onClick={handleAddSegment} variant="contained" sx={{ minWidth: 112 }}>
                    Добавить
                </Button>
            </FormActions>
        </>
    );
};

export default SegmentDetailsPage;
