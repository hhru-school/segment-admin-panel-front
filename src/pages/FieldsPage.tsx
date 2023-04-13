import Link from '@mui/material/Link';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const FieldsPage: React.FC = () => {
    return <UnderConstructionPage pageName="Поля" nextLink={<Link href="1">Поле</Link>} />;
};

export default FieldsPage;
