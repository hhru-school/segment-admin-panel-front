import { Outlet, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const LayerSegmentsPage: React.FC = () => {
    const { segmentId } = useParams();

    if (segmentId !== undefined) {
        return <Outlet />;
    }

    return <UnderConstructionPage pageName="Сегменты" nextLink={<Link href="1">Сегмент</Link>} />;
};

export default LayerSegmentsPage;
