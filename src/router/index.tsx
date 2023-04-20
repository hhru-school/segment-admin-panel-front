import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from 'App';
import EntryPointPage from 'pages/EntryPointPage';
import EntryPointsPage from 'pages/EntryPointsPage';
import FieldGroupsPage from 'pages/FieldGroupsPage';
import FieldPage from 'pages/FieldPage';
import FieldsPage from 'pages/FieldsPage';
import HomePage from 'pages/HomePage';
import InfoPage from 'pages/InfoPage';
import LayerChangesPage from 'pages/LayerChangesPage';
import LayerPage from 'pages/LayerPage';
import LayersPage from 'pages/LayersPage';
import NotFoundPage from 'pages/NotFoundPage';
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
                    { path: '', element: <Navigate to="layers" replace /> },
                    { path: 'layers', element: <LayersPage /> },
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
                        element: <SegmentsPage />,
                        children: [{ path: ':segmentId', element: <SegmentPage /> }],
                    },
                    { path: 'entry-points', element: <EntryPointsPage /> },
                    { path: 'entry-points/:entryPointId', element: <EntryPointPage /> },
                    { path: 'fields', element: <FieldsPage /> },
                    { path: 'fields/:fieldId', element: <FieldPage /> },
                    { path: 'field-groups', element: <FieldGroupsPage /> },
                ],
            },
            { path: 'not-found', element: <NotFoundPage /> },
            { path: '*', element: <Navigate to="not-found" replace /> },
        ],
    },
]);

export default router;
