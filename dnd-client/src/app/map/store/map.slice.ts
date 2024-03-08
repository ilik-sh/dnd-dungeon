import { createSlice } from "@reduxjs/toolkit";
import { MapState } from "../types/map.state";
import { mockData } from "../mock";

const initialState: MapState = {
  map: [],
  selectedRoom: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap(state, { payload }) {
      state.map = payload.map;
    },
    setSelectedRoom(state, { payload }) {
      state.selectedRoom = payload.selectedRoom;
    },
  },
});

export const { setMap } = mapSlice.actions;
export default mapSlice;
