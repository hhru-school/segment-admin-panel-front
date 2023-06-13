import { useEffect } from 'react';
import { Form } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Wizard, { Page } from 'components/Wizard';
import isEmpty from 'helpers/isEmpty';
import sleep from 'helpers/sleep';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import FormLayout from 'layouts/FormLayout';
import { fetchLayersList, reset, selectLayersListError } from 'models/layersList';
import { FormError } from 'types/common';
import { LayerStates, LayersListItem } from 'types/layer';
import { SegmentsFieldValue } from 'types/segment';

import LayerInfoPage from 'components/AddingLayerForm/pages/InfoPage';
import LayerSegmentsPage from 'components/AddingLayerForm/pages/SegmentsPage';

export const enum PageName {
    Info = 'Info',
    Segments = 'Segments',
}
export const enum FieldName {
    Title = 'title',
    Description = 'description',
    ParentLayer = 'parentLayer',
    Segments = 'segments',
}
interface Values {
    [FieldName.Title]: string;
    [FieldName.Description]: string;
    [FieldName.ParentLayer]: LayersListItem | null;
    [FieldName.Segments]: SegmentsFieldValue | null;
}

const INITIAL_VALUES: Values = { title: '', description: '', parentLayer: null, segments: null };
const validator = (values: Values): FormError<Values> => {
    const errors: FormError<Values> = {};
    if (!values.title) {
        errors.title = 'Пожалуйста, введите наименование слоя.';
    }
    if (!values.parentLayer || isEmpty(values.parentLayer)) {
        errors.parentLayer = 'Пожалуйста, выберите родительский слой.';
    }
    return errors;
};

const pages = new Map<`${PageName}`, Page>([
    [PageName.Info, { title: 'Новый слой / Основная информация', element: <LayerInfoPage /> }],
    [PageName.Segments, { title: 'Новый слой / Сегменты', element: <LayerSegmentsPage /> }],
]);

const AddingLayerForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLayersListError, shallowEqual);
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        void dispatch(fetchLayersList([LayerStates.Stable]));
        return () => {
            dispatch(reset());
        };
    }, [dispatch, setAlert]);

    useEffect(() => {
        if (error !== null) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    const handleSubmit = async (values: Values) => {
        await sleep(2000);
        // eslint-disable-next-line no-console
        console.log(values);
        navigate('/layers');
    };

    return (
        <Wizard pages={pages} defaultPage={PageName.Info}>
            {({ activePage }) => {
                return (
                    <FormLayout title={activePage?.title} ContainerProps={{ maxWidth: 'md' }}>
                        <Form<Values>
                            onSubmit={handleSubmit}
                            initialValues={INITIAL_VALUES}
                            validate={validator}
                            subscription={{
                                submitting: true,
                                pristine: true,
                                submitSucceeded: true,
                                submitError: true,
                            }}
                            render={({ handleSubmit }) => (
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    {activePage?.element}
                                </form>
                            )}
                        />
                    </FormLayout>
                );
            }}
        </Wizard>
    );
};

export default AddingLayerForm;
