import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import LayerIcon from '@mui/icons-material/LibraryAddOutlined';
import EntryPointIcon from '@mui/icons-material/OpenInNewOutlined';
import GroupFieldsIcon from '@mui/icons-material/QuizOutlined';

import { isApiError } from 'api';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import LayerLayout from 'layouts/LayerLayout';
import { fetchLayer, selectCurrentLayerTitle, selectCurrentLayerLoadingStatus, reset } from 'models/currentLayer';

const LayerPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { layerId, entryPointId } = useParams();
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const title = useAppSelector(selectCurrentLayerTitle);
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        void dispatch(fetchLayer(Number(layerId)))
            .unwrap()
            .catch((error) => {
                if (isApiError(error)) {
                    if (error.code === 404) {
                        navigate('/not-found', { replace: true });
                    } else {
                        setAlert(error.message);
                    }
                }
            });
        return () => {
            dispatch(reset());
        };
    }, [layerId, dispatch, navigate, setAlert]);

    if (entryPointId !== undefined) {
        return <Outlet />;
    }

    return (
        <LayerLayout
            drawerOptions={[
                { href: 'info', primaryText: 'Основная информация', icon: <InfoIcon /> },
                { href: 'changes', primaryText: 'Изменения в слое', icon: <LayerIcon /> },
                { href: 'segments', primaryText: 'Сегменты', icon: <SegmentsIcon /> },
                { href: 'entry-points', primaryText: 'Точки входа', icon: <EntryPointIcon /> },
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
