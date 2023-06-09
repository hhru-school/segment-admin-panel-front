import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import ErrorAlertProvider from 'components/ErrorAlert/ErrorAlertContext';
import router from 'router';
import { store } from 'store';
import theme from 'theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ErrorAlertProvider>
                    <RouterProvider router={router} />
                </ErrorAlertProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
