import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import LayerIcon from '@mui/icons-material/LibraryAddOutlined';
import EntryPointIcon from '@mui/icons-material/OpenInNewOutlined';
import FieldsIcon from '@mui/icons-material/QuestionAnswerOutlined';
import GroupFieldsIcon from '@mui/icons-material/QuizOutlined';

import { isApiError } from 'api';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import LayerLayout from 'layouts/LayerLayout';
import {
    fetchLayer,
    selectCurrentLayerTitle,
    selectCurrentLayerError,
    selectCurrentLayerLoadingStatus,
    reset,
} from 'models/currentLayer';

const LayerPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { layerId, entryPointId, fieldId } = useParams();
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const error = useAppSelector(selectCurrentLayerError, shallowEqual);
    const title = useAppSelector(selectCurrentLayerTitle);
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        void dispatch(fetchLayer(Number(layerId)))
            .unwrap()
            .catch((error) => {
                if (isApiError(error) && error.code === 404) {
                    navigate('/not-found', { replace: true });
                }
            });
        return () => {
            dispatch(reset());
        };
    }, [layerId, dispatch, navigate]);

    useEffect(() => {
        if (error !== null && error.code !== 404) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    if (entryPointId !== undefined || fieldId !== undefined) {
        return <Outlet />;
    }

    return (
        <LayerLayout
            drawerOptions={[
                { href: 'info', primaryText: 'Основная информация', icon: <InfoIcon /> },
                { href: 'changes', primaryText: 'Изменения в слое', icon: <LayerIcon /> },
                { href: 'segments', primaryText: 'Сегменты', icon: <SegmentsIcon /> },
                { href: 'entry-points', primaryText: 'Точки входа', icon: <EntryPointIcon /> },
                { href: 'fields', primaryText: 'Поля', icon: <FieldsIcon /> },
                { href: 'field-groups', primaryText: 'Группы полей', icon: <GroupFieldsIcon /> },
            ]}
            title={title}
            loading={isLoading}
        >
            <Outlet />
        </LayerLayout>
    );
};

export default LayerPage;
