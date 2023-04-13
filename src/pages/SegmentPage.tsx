import DetailsLayout from 'layouts/DetailsLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const SegmentsPage: React.FC = () => {
    return (
        <DetailsLayout title="Сегмент такой-то">
            <UnderConstructionPage pageName="Сегмент" />;
        </DetailsLayout>
    );
};

export default SegmentsPage;
