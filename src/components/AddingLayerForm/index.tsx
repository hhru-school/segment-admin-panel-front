import { useEffect } from 'react';
import { Form } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';

import api, { apiErrorHandler } from 'api';
import Wizard, { Page } from 'components/Wizard';
import isEmpty from 'helpers/isEmpty';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import FormLayout from 'layouts/FormLayout';
import { fetchLayersList, reset, selectLayersListError } from 'models/layersList';
import { FormError } from 'types/common';
import { LayerStates } from 'types/layer';

import getRequestBody from 'components/AddingLayerForm/helpers/getRequestBody';
import addFieldToScreen from 'components/AddingLayerForm/mutators/addFieldToScreen';
import addNewSegment from 'components/AddingLayerForm/mutators/addNewSegment';
import calcNewScreenFieldsPosition from 'components/AddingLayerForm/mutators/calcNewScreenFieldsPosition';
import calcNewScreensPosition from 'components/AddingLayerForm/mutators/calcNewScreensPosition';
import initSegmentDetails from 'components/AddingLayerForm/mutators/initSegmentDetails';
import initSegments from 'components/AddingLayerForm/mutators/initSegments';
import removeFieldFromScreen from 'components/AddingLayerForm/mutators/removeFieldFromScreen';
import removeScreen from 'components/AddingLayerForm/mutators/removeScreen';
import removeSegment from 'components/AddingLayerForm/mutators/removeSegment';
import resetSegment from 'components/AddingLayerForm/mutators/resetSegment';
import resetSegments from 'components/AddingLayerForm/mutators/resetSegments';
import updateSegmentFields from 'components/AddingLayerForm/mutators/updateSegmentFields';
import AddSegmentPage from 'components/AddingLayerForm/pages/AddSegmentPage';
import LayerInfoPage from 'components/AddingLayerForm/pages/InfoPage';
import ScreensPage from 'components/AddingLayerForm/pages/ScreensPage';
import SegmentDetailsPage from 'components/AddingLayerForm/pages/SegmentDetailsPage';
import LayerSegmentsPage from 'components/AddingLayerForm/pages/SegmentsPage';
import { NewLayer, PagesState, isPagesState } from 'components/AddingLayerForm/types';

export const enum PageName {
    Info = 'Info',
    Segments = 'Segments',
    Details = 'Details',
    Screens = 'Screens',
    AddSegment = 'AddSegment',
}

const pages = new Map<`${PageName}`, Page>([
    [PageName.Info, { name: PageName.Info, element: <LayerInfoPage /> }],
    [PageName.Segments, { name: PageName.Segments, element: <LayerSegmentsPage /> }],
    [PageName.Details, { name: PageName.Details, element: <SegmentDetailsPage /> }],
    [PageName.Screens, { name: PageName.Screens, element: <ScreensPage /> }],
    [PageName.AddSegment, { name: PageName.AddSegment, element: <AddSegmentPage /> }],
]);

const getTitle = (page?: Page, state?: unknown): string => {
    if (page?.name) {
        const segmentTitle = isPagesState(state) && state.segment !== null ? state.segment.title : '';
        const titles = {
            [`${PageName.Info}`]: 'Новый слой / Основная информация',
            [`${PageName.Segments}`]: 'Новый слой / Сегменты',
            [`${PageName.Details}`]: `Новый слой / ${segmentTitle}`,
            [`${PageName.Screens}`]: `Новый слой / ${segmentTitle} / Добавление экранов`,
            [`${PageName.AddSegment}`]: 'Новый слой / Добавление сегмента',
        };
        return titles[page.name] || '';
    }
    return '';
};

const INITIAL_VALUES: NewLayer = { title: '', description: '', parentLayer: null, segments: null };

const validator = (values: NewLayer): FormError<NewLayer> => {
    const errors: FormError<NewLayer> = {};
    if (!values.title) {
        errors.title = 'Пожалуйста, введите наименование слоя.';
    }
    if (!values.parentLayer || isEmpty(values.parentLayer)) {
        errors.parentLayer = 'Пожалуйста, выберите родительский слой.';
    }
    return errors;
};

const submitErrorHandler = (error: unknown): string => {
    const DEFAULT_BAD_REQUEST_MESSAGE = 'Не удалось добавить слой. Проверьте введенные данные и повторите попытку.';
    const apiError = apiErrorHandler(error);

    if (apiError?.code === 400) {
        return apiError?.data?.message || DEFAULT_BAD_REQUEST_MESSAGE;
    }

    return apiError.message;
};

const INITIAL_BACK_STATE: PagesState = {
    segments: null,
    segment: null,
    entryPoint: null,
    newDynamicScreen: null,
};

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

    const handleSubmit = async (values: NewLayer) => {
        try {
            await api.post<NewLayer>('/layers/add', getRequestBody(values));
        } catch (error) {
            const message = submitErrorHandler(error);
            setAlert(message);
            return { [FORM_ERROR]: message };
        }
        return navigate('/layers');
    };

    return (
        <Wizard pages={pages} defaultPage={PageName.Info} state={INITIAL_BACK_STATE}>
            {({ activePage, state }) => {
                return (
                    <FormLayout title={getTitle(activePage, state)} ContainerProps={{ maxWidth: 'md' }}>
                        <Form<NewLayer>
                            onSubmit={handleSubmit}
                            initialValues={INITIAL_VALUES}
                            validate={validator}
                            subscription={{
                                submitting: true,
                                pristine: true,
                                submitSucceeded: true,
                                submitError: true,
                            }}
                            mutators={{
                                initSegments,
                                resetSegments,
                                addNewSegment,
                                removeSegment,
                                resetSegment,
                                initSegmentDetails,
                                addFieldToScreen,
                                removeFieldFromScreen,
                                removeScreen,
                                updateSegmentFields,
                                calcNewScreensPosition,
                                calcNewScreenFieldsPosition,
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
export { INITIAL_BACK_STATE };
