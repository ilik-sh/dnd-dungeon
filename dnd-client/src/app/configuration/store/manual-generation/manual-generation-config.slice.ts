import { createSlice } from "@reduxjs/toolkit";
import { ManualConfigState } from "../../types/manual-config.state";

const initialState: ManualConfigState = {
  cells: [],
  mapSize: 7,
  selectedCell: null,
};

const manualGenerationConfigSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setMapSize(state, { payload }) {
      state.mapSize = payload.mapSize;
    },
  },
});

export const { setMapSize } = manualGenerationConfigSlice.actions;
export default manualGenerationConfigSlice;
