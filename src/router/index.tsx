import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from 'App';
import CreateNewFieldPage from 'pages/CreateNewFieldPage';
import CreateNewLayerPage from 'pages/CreateNewLayerPage';
import CreateNewScreenPage from 'pages/CreateNewScreenPage';
import CreateNewSegmentPage from 'pages/CreateNewSegmentPage';
import FieldPage from 'pages/FieldPage';
import FieldsPage from 'pages/FieldsPage';
import HomePage from 'pages/HomePage';
import InfoPage from 'pages/InfoPage';
import LayerPage from 'pages/LayerPage';
import LayerSegmentPage from 'pages/LayerSegmentPage';
import LayerSegmentsPage from 'pages/LayerSegmentsPage';
import LayersPage from 'pages/LayersPage';
import NotFoundPage from 'pages/NotFoundPage';
import ScreensPage from 'pages/ScreensPage';
import SegmentPage from 'pages/SegmentPage';
import SegmentsPage from 'pages/SegmentsPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />,
                children: [
                    { path: 'layers', element: <LayersPage /> },
                    { path: 'fields', element: <FieldsPage /> },
                    { path: 'screens', element: <ScreensPage /> },
                    { path: 'segments', element: <SegmentsPage /> },
                ],
            },
            {
                path: 'layers/:layerId',
                element: <LayerPage />,
                children: [
                    { path: 'info', element: <InfoPage /> },
                    { path: 'segments', element: <LayerSegmentsPage /> },
                    { path: 'segments/:segmentId', element: <LayerSegmentPage /> },
                ],
            },

            { path: 'fields/:fieldId', element: <FieldPage /> },
            { path: 'segments/:segmentId', element: <SegmentPage /> },
            { path: 'segments/new', element: <CreateNewSegmentPage /> },
            { path: 'new/layer', element: <CreateNewLayerPage /> },
            { path: 'new/field', element: <CreateNewFieldPage /> },
            { path: 'new/screen', element: <CreateNewScreenPage /> },
        ],
    },
    { path: '/not-found', element: <NotFoundPage /> },
    { path: '*', element: <Navigate to="/not-found" replace /> },
]);

export default router;
