import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import currentLayerReducer from 'models/currentLayer';
import layersListReducer from 'models/layersList';

export const store = configureStore({
    reducer: {
        layersList: layersListReducer,
        currentLayer: currentLayerReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
