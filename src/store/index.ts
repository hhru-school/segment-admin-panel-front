import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import currentFieldReducer from 'models/currentField';
import currentLayerReducer from 'models/currentLayer';
import fieldsReducer from 'models/fields';
import layerChangesReducer from 'models/layerChanges';
import layersListReducer from 'models/layersList';
import screensReducer from 'models/screens';

export const store = configureStore({
    reducer: {
        layersList: layersListReducer,
        currentLayer: currentLayerReducer,
        currentLayerChanges: layerChangesReducer,
        fields: fieldsReducer,
        currentField: currentFieldReducer,
        screens: screensReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
