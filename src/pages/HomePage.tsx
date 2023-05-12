import { Outlet } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default HomePage;
