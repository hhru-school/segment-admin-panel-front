import { Outlet } from 'react-router-dom';

import HomeLayout from 'layouts/HomeLayout';

const HomePage: React.FC = () => {
    return (
        <HomeLayout>
            <Outlet />
        </HomeLayout>
    );
};

export default HomePage;
