import { useEffect, useMemo } from 'react';
import { Field, useForm } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { PageName } from 'components/AddingLayerForm';
import ScreensInput from 'components/AddingLayerForm/fields/ScreensInput';
import { ScreenFieldInputValue, ScreenInputValue, isPagesState } from 'components/AddingLayerForm/types';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';
import createIdMap from 'helpers/createIdMap';
import indexToPosition from 'helpers/indexToPosition';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchScreens, reset, selectScreensError, selectScreensList, selectScreensLoadingStatus } from 'models/screens';
import { Field as FieldType } from 'types/field';
import { Screen, ScreenTypes } from 'types/screen';

const normalizeScreenField = (value: FieldType, index: number): ScreenFieldInputValue => {
    return { ...value, position: indexToPosition(index), isNew: true, visibility: 'HIDE' };
};

const normalizeScreen = ({ filtered, fields, ...rest }: Screen): ScreenInputValue => {
    return {
        ...rest,
        fields: createIdMap<FieldType, ScreenFieldInputValue>(fields, normalizeScreenField),
        isNew: true,
        position: 0,
    };
};

const ScreensPage: React.FC = () => {
    const { state, previousPage } = useWizard();

    if (!isPagesState(state) || state.segment === null || state.entryPoint === null) {
        throw new Error('Не заданы сегмент или точка входа.');
    }

    const { segment, entryPoint } = state;
    const name = `segments.id-${segment.id}.entryPoints.id-${entryPoint.id}.screens`;
    const segmentName = `segments.id-${segment.id}`;

    const form = useForm();
    const dispatch = useAppDispatch();
    const { setActivePageHandler } = useWizard();
    const { setAlert } = useErrorAlert();

    const isLoading = useAppSelector(selectScreensLoadingStatus);
    const screenList = useAppSelector(selectScreensList, shallowEqual);
    const error = useAppSelector(selectScreensError, shallowEqual);

    const options = useMemo(
        () => screenList.map(normalizeScreen).filter(({ id }) => !entryPoint.screens[`id-${id}`]),
        [screenList, entryPoint.screens]
    );

    const handleAddScreen = () => {
        form.mutators.calcNewScreensPosition(name);
        form.mutators.updateSegmentFields(segmentName);
        setActivePageHandler(previousPage || PageName.Details);
    };

    const handleCancel = () => {
        form.change(name, entryPoint.screens);
        setActivePageHandler(previousPage || PageName.Details);
    };

    useEffect(() => {
        void dispatch(fetchScreens(ScreenTypes.Static));
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
            <Typography component="div" sx={{ color: 'text.secondary', mt: 2, mb: 4 }}>
                Выберете экраны которые нужно добавить в сегмент.
            </Typography>
            <Box sx={{ mb: 4 }}>
                {isLoading ? (
                    <Skeleton variant="rounded" width={252} height={320} />
                ) : (
                    <Field name={name}>{(props) => <ScreensInput {...props} options={options} />}</Field>
                )}
            </Box>

            <FormActions>
                <Button onClick={handleCancel} variant="outlined" color="inherit" sx={{ minWidth: 112 }}>
                    Отмена
                </Button>
                <Button onClick={handleAddScreen} variant="contained" sx={{ minWidth: 112 }}>
                    Добавить
                </Button>
            </FormActions>
        </>
    );
};

export default ScreensPage;
