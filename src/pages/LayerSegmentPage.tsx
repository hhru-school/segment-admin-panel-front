import SecondaryLayout from 'layouts/SecondaryLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const LayerSegmentsPage: React.FC = () => {
    return (
        <SecondaryLayout title="Сегмент">
            <UnderConstructionPage pageName="Сегмент" />;
        </SecondaryLayout>
    );
};

export default LayerSegmentsPage;
