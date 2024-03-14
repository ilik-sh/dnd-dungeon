import { configureStore } from "@reduxjs/toolkit";
import manualGenerationConfigSlice from "app/configuration/store/manual-generation/manual-generation-config.slice";
import mapSlice from "app/map/store/map.slice";

const store = configureStore({
  reducer: {
    manualGenerationConfig: manualGenerationConfigSlice.reducer,
    map: mapSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
