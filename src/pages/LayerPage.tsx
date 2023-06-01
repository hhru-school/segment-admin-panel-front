import { useEffect } from 'react';
import { Outlet, useParams, useNavigate, useMatch } from 'react-router-dom';
import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import { isApiError } from 'api';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import LayerLayout from 'layouts/LayerLayout';
import { fetchLayer, selectCurrentLayerTitle, selectCurrentLayerLoadingStatus, reset } from 'models/currentLayer';

const LayerPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const redirect = useMatch('/layers/:layerId');
    const { layerId, segmentId } = useParams();
    const isLoading = useAppSelector(selectCurrentLayerLoadingStatus);
    const title = useAppSelector(selectCurrentLayerTitle);
    const { setAlert } = useErrorAlert();

    useEffect(() => {
        if (redirect) {
            navigate(`${redirect.pathnameBase}/info`, { replace: true });
        } else {
            void dispatch(fetchLayer(Number(layerId)))
                .unwrap()
                .catch((error) => {
                    if (isApiError(error)) {
                        if (error?.code === 404) {
                            navigate('/not-found', { replace: true });
                        } else {
                            setAlert(error.message);
                        }
                    }
                });
        }
        return () => {
            dispatch(reset());
        };
    }, [layerId, redirect, dispatch, navigate, setAlert]);

    if (segmentId !== undefined) {
        return <Outlet />;
    }

    return (
        <LayerLayout
            drawerOptions={[
                { href: 'info', primaryText: 'Основная информация', icon: <InfoIcon /> },
                { href: 'segments', primaryText: 'Сегменты', icon: <SegmentsIcon /> },
            ]}
            title={title || 'Нет данных'}
            loading={isLoading}
        >
            <Outlet />
        </LayerLayout>
    );
};

export default LayerPage;
