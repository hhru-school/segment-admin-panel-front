import SecondaryLayout from 'layouts/SecondaryLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const CreateNewFieldPage: React.FC = () => {
    return (
        <SecondaryLayout title="Новое поле" backHref="/fields">
            <UnderConstructionPage pageName="Создание нового поля" />
        </SecondaryLayout>
    );
};

export default CreateNewFieldPage;
