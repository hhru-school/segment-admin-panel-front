import SecondaryLayout from 'layouts/SecondaryLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const EntryPointPage: React.FC = () => {
    return (
        <SecondaryLayout title="Точка входа такая-то">
            <UnderConstructionPage pageName="Точка входа" />;
        </SecondaryLayout>
    );
};

export default EntryPointPage;
