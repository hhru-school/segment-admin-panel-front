import { Outlet } from 'react-router-dom';

import ErrorAlert from 'components/ErrorAlert';

const App: React.FC = () => {
    return (
        <>
            <Outlet />
            <ErrorAlert />
        </>
    );
};

export default App;
