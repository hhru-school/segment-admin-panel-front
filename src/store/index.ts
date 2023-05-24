import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import currentFieldReducer from 'models/currentField';
import currentLayerReducer from 'models/currentLayer';
import currentSegmentReducer from 'models/currentSegment';
import fieldsReducer from 'models/fields';
import layerChangesReducer from 'models/layerChanges';
import layersListReducer from 'models/layersList';
import rolesReducer from 'models/roles';
import screensReducer from 'models/screens';
import segmentsReducer from 'models/segments';

export const store = configureStore({
    reducer: {
        layersList: layersListReducer,
        currentLayer: currentLayerReducer,
        currentLayerChanges: layerChangesReducer,
        currentSegment: currentSegmentReducer,
        fields: fieldsReducer,
        currentField: currentFieldReducer,
        screens: screensReducer,
        segments: segmentsReducer,
        roles: rolesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
