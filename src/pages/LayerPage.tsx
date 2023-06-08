import { useEffect } from 'react';
import { Outlet, useParams, useNavigate, useMatch } from 'react-router-dom';
import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import { useAppSelector } from 'hooks/redux-hooks';
import LayerLayout from 'layouts/LayerLayout';
import { RootState } from 'store';

const selectLayerTitle = (state: RootState): string | null => {
    return state.currentLayer.item?.title || state.currentLayerSegments.item?.title || null;
};
const selectLayerLoadingStatus = (state: RootState): boolean => {
    return state.currentLayer.isLoading && state.currentLayerSegments.isLoading;
};

const LayerPage: React.FC = () => {
    const navigate = useNavigate();
    const redirect = useMatch('/layers/:layerId');
    const { segmentId } = useParams();
    const isLoading = useAppSelector(selectLayerLoadingStatus);
    const title = useAppSelector(selectLayerTitle);

    useEffect(() => {
        if (redirect) {
            navigate(`${redirect.pathnameBase}/info`, { replace: true });
        }
    }, [redirect, navigate]);

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
