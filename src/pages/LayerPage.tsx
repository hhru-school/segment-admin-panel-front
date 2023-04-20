import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { Outlet, redirect, useParams } from 'react-router-dom';
import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import LayerIcon from '@mui/icons-material/LibraryAddOutlined';
import EntryPointIcon from '@mui/icons-material/OpenInNewOutlined';
import FieldsIcon from '@mui/icons-material/QuestionAnswerOutlined';
import GroupFieldsIcon from '@mui/icons-material/QuizOutlined';

import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import LayerLayout from 'layouts/LayerLayout';
import {
    remove,
    fetchLayer,
    selectCurrentLayerTitle,
    selectCurrentLayerError,
    selectCurrentLayerLoadingStatus,
} from 'models/currentLayer';

const LayerPage: React.FC = () => {
    const { layerId, entryPointId, fieldId } = useParams();
    const dispatch = useAppDispatch();
    const title = useAppSelector(selectCurrentLayerTitle);
    const error = useAppSelector(selectCurrentLayerError, shallowEqual);
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        if (layerId != null) {
            void dispatch(fetchLayer(Number(layerId)));
        }
        return () => void dispatch(remove());
    }, [layerId, dispatch]);

    useEffect(() => {
        if (error != null) {
            if (error.code === 404) {
                redirect('/not-found');
            } else {
                setAlert(error.message);
            }
        }
    }, [error, setAlert]);

    if (entryPointId != null || fieldId != null) {
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
