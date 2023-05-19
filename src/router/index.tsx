import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from 'App';
import CreateNewFieldPage from 'pages/CreateNewFieldPage';
import CreateNewLayerPage from 'pages/CreateNewLayerPage';
import CreateNewScreenPage from 'pages/CreateNewScreenPage';
import EntryPointPage from 'pages/EntryPointPage';
import EntryPointsPage from 'pages/EntryPointsPage';
import FieldGroupsPage from 'pages/FieldGroupsPage';
import FieldPage from 'pages/FieldPage';
import FieldsPage from 'pages/FieldsPage';
import HomePage from 'pages/HomePage';
import InfoPage from 'pages/InfoPage';
import LayerChangesPage from 'pages/LayerChangesPage';
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
                    { path: '', element: <Navigate to="/layers" replace /> },
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
                    { path: '', element: <Navigate to="info" replace /> },
                    { path: 'info', element: <InfoPage /> },
                    { path: 'changes', element: <LayerChangesPage /> },
                    {
                        path: 'segments',
                        element: <LayerSegmentsPage />,
                        children: [{ path: ':segmentId', element: <LayerSegmentPage /> }],
                    },
                    { path: 'entry-points', element: <EntryPointsPage /> },
                    { path: 'entry-points/:entryPointId', element: <EntryPointPage /> },
                    { path: 'field-groups', element: <FieldGroupsPage /> },
                ],
            },
            { path: 'fields/:fieldId', element: <FieldPage /> },
            { path: 'segments/:segmentId', element: <SegmentPage /> },
            { path: 'new/layer', element: <CreateNewLayerPage /> },
            { path: 'new/field', element: <CreateNewFieldPage /> },
            { path: 'new/screen', element: <CreateNewScreenPage /> },
        ],
    },
    { path: '/not-found', element: <NotFoundPage /> },
    { path: '*', element: <Navigate to="not-found" replace /> },
]);

export default router;
