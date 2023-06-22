import { useEffect, useState } from 'react';
import { useForm } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Button from '@mui/material/Button';

import { isApiError } from 'api';
import { INITIAL_BACK_STATE, PageName } from 'components/AddingLayerForm';
import SegmentInput from 'components/AddingLayerForm/fields/SegmentInput';
import SelectSegment from 'components/AddingLayerForm/fields/SelectSegment';
import { isPagesState } from 'components/AddingLayerForm/types';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchEntryPoints, reset as resetEntryPoints, selectEntryPointsList } from 'models/entryPoints';
import { fetchFields, reset as resetFields } from 'models/fields';
import { fetchSegments, reset as resetSegments } from 'models/segments';
import { Segment } from 'types/segment';

const AddSegmentPage: React.FC = () => {
    const form = useForm();
    const { state, setPageHandler, setStateHandler } = useWizard();

    if (!isPagesState(state)) {
        throw new Error('Не задано предыдущее значение состояния.');
    }

    const { segments, segment } = state;
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const entryPoints = useAppSelector(selectEntryPointsList, shallowEqual);
    const [currentSegment, setCurrentSegment] = useState<Segment | null>(segment as unknown as Segment);

    const handleChangeCurrentSegment = (newValue: Segment | null) => {
        if (currentSegment) {
            form.mutators.removeSegment(`id-${currentSegment.id}`);
        }
        if (newValue) {
            form.mutators.addNewSegment(newValue, entryPoints);
        }
        setCurrentSegment(newValue);
        setStateHandler({ ...state, segment: newValue });
    };

    const handleCancel = () => {
        setPageHandler(PageName.Segments, INITIAL_BACK_STATE);
    };

    const handleAddSegment = () => {
        setPageHandler(PageName.Segments, INITIAL_BACK_STATE);
    };

    useEffect(() => {
        Promise.all([
            dispatch(fetchSegments()).unwrap(),
            dispatch(fetchEntryPoints()).unwrap(),
            dispatch(fetchFields({ type: 'question' })).unwrap(),
        ]).catch((error) => {
            if (isApiError(error)) {
                setAlert(error.message);
            }
        });
        return () => {
            dispatch(resetSegments());
            dispatch(resetEntryPoints());
            dispatch(resetFields());
        };
    }, [dispatch, setAlert]);

    return (
        <>
            <SelectSegment value={currentSegment} currentSegments={segments} onChange={handleChangeCurrentSegment} />
            {currentSegment && <SegmentInput name={`id-${currentSegment.id}`} />}
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

export default AddSegmentPage;
