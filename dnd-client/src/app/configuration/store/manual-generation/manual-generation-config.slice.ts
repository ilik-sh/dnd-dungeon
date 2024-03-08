import { createSlice } from "@reduxjs/toolkit";
import { ManualConfigState } from "../../types/manual-config.state";

const initialState: ManualConfigState = {
  cells: [],
  mapSize: 7,
};

const manualGenerationConfigSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    addRoom(state, { payload }) {
      const cell = state.cells.find((cell) => cell.id === payload.id);
      cell!.rooms = [...cell!.rooms, payload.variant];
    },
    addCell(state, { payload }) {
      state.cells = [...state.cells, payload.cell];
    },
    setMapSize(state, { payload }) {
      state.mapSize = payload.mapSize;
    },
    updateRoom(state, { payload }) {
      const cell = state.cells.find((cell) => payload.room.parentId == cell.id);
      cell?.rooms.map((room, index) => {
        if (payload.room.id == room.id) {
          cell.rooms[index] = payload.room;
        }
      });
    },
    deleteRoom(state, { payload }) {
      const cell = state.cells.find((cell) => payload.id == cell.id);
      cell!.rooms = cell!.rooms.filter((room) => room.id !== payload.room.id);
    },
    selectRoom(state, { payload }) {
      const cell = state.cells.find((cell) => payload.id == cell.id);
      cell!.currentRoom = payload.room;
    },
  },
});

export const {
  addRoom,
  addCell,
  setMapSize,
  updateRoom,
  deleteRoom,
  selectRoom,
} = manualGenerationConfigSlice.actions;
export default manualGenerationConfigSlice;
