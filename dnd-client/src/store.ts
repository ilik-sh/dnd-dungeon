import { combineReducers, configureStore } from "@reduxjs/toolkit";
import manualGenerationConfigSlice from "app/configuration/store/manual-generation/manual-generation-config.slice";
import storage from "redux-persist/lib/storage";
import mapSlice from "app/map/store/map.slice";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import authSlice from "app/auth/store/auth.slice";
import modalsSlice from "store/modals.slice";

const persistConfig = {
  key: "root",
  storage,
};

const userReducers = combineReducers({
  manualGenerationConfig: manualGenerationConfigSlice.reducer,
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
