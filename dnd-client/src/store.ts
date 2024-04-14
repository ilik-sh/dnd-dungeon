import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import mapSlice from 'app/configuration/store/map.slice';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import authSlice from 'app/auth/store/auth.slice';
import modalsSlice from 'store/modals.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const userReducers = combineReducers({
  map: mapSlice.reducer,
  auth: authSlice.reducer,
  modals: modalsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, userReducers);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
