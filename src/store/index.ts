import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import currentFieldReducer from 'models/currentField';
import currentLayerReducer from 'models/currentLayer';
import currentLayerSegmentReducer from 'models/currentLayerSegment';
import currentLayerSegmentsReducer from 'models/currentLayerSegments';
import currentSegmentReducer from 'models/currentSegment';
import entryPointsReducer from 'models/entryPoints';
import fieldsReducer from 'models/fields';
import layersListReducer from 'models/layersList';
import rolesReducer from 'models/roles';
import screensReducer from 'models/screens';
import segmentsReducer from 'models/segments';

export const store = configureStore({
    reducer: {
        layersList: layersListReducer,
        currentLayer: currentLayerReducer,
        currentLayerSegment: currentLayerSegmentReducer,
        currentLayerSegments: currentLayerSegmentsReducer,
        currentSegment: currentSegmentReducer,
        fields: fieldsReducer,
        currentField: currentFieldReducer,
        screens: screensReducer,
        segments: segmentsReducer,
        roles: rolesReducer,
        entryPoints: entryPointsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
