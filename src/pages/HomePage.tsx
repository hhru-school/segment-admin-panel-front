import Link from '@mui/material/Link';

import HomeLayout from 'layouts/HomeLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const HomePage: React.FC = () => {
    return (
        <HomeLayout>
            <UnderConstructionPage pageName="Главная" nextLink={<Link href="layer/1">Слой</Link>} />
        </HomeLayout>
    );
};

export default HomePage;
