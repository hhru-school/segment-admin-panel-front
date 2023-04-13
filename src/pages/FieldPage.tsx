import DetailsLayout from 'layouts/DetailsLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const FieldPage: React.FC = () => {
    return (
        <DetailsLayout title="Поле такое-то">
            <UnderConstructionPage pageName="Поле" />;
        </DetailsLayout>
    );
};

export default FieldPage;
