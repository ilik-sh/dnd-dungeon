import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dndApi } from 'app/api/dnd-api';
import { mapSlice } from 'pages/map-editor';
import { toolsSlice } from 'pages/map-editor';
import hoverSlice from 'pages/map-editor/model/store/hover/hover.slice';

const userReducers = combineReducers({
  map: mapSlice.reducer,
  tools: toolsSlice.reducer,
  hover: hoverSlice.reducer,
  [dndApi.reducerPath]: dndApi.reducer,
});

const store = configureStore({
  reducer: userReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dndApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
