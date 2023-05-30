import { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const redirect = useMatch('/');

    useEffect(() => {
        if (redirect) {
            navigate('/layers', { replace: true });
        }
    }, [redirect, navigate]);

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default HomePage;
