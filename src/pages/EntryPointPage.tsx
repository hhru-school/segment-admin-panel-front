import DetailsLayout from 'layouts/DetailsLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const EntryPointPage: React.FC = () => {
    return (
        <DetailsLayout title="Точка входа такая-то">
            <UnderConstructionPage pageName="Точка входа" />;
        </DetailsLayout>
    );
};

export default EntryPointPage;
