import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dndApi } from 'api/dnd-api';
import authSlice from 'app/auth/store/auth.slice';
import mapSlice from 'app/configuration/store/map.slice';
import { errorLogger } from 'middleware/error-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalsSlice from 'store/modals.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const userReducers = combineReducers({
  map: mapSlice.reducer,
  auth: authSlice.reducer,
  modals: modalsSlice.reducer,
  [dndApi.reducerPath]: dndApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, userReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dndApi.middleware, errorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
