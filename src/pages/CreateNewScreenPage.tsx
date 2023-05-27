import SecondaryLayout from 'layouts/SecondaryLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const CreateNewScreenPage: React.FC = () => {
    return (
        <SecondaryLayout title="Новый экран" backHref="/screens">
            <UnderConstructionPage pageName="Создание нового экрана" />
        </SecondaryLayout>
    );
};

export default CreateNewScreenPage;
