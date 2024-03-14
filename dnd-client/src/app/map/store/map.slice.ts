import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MapState } from "../types/map.state";
import { mockData } from "../mock";
import { linear2dSearch } from "utils/linear2dSearch";
import { RoomChildDto } from "app/configuration/types/room-child.dto";
import { CellDto } from "app/configuration/types/cell.dto";
import { RoomDto } from "types/room.dto";
import { ContextMenu } from "../types/context-menu.type";

const initialState: MapState = {
  map: [],
  selectedCellId: null,
  contextMenu: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap(state, { payload }) {
      return { ...state, map: payload.map };
    },
    addRoom(state, { payload }) {
      const cell = linear2dSearch(state.map, payload.room.parentId);
      cell?.rooms.push(payload.room);
    },
    updateRoom(state, { payload: room }: PayloadAction<RoomChildDto>) {
      const cell = linear2dSearch(state.map, room.parentId);
      if (!cell) {
        return;
      }
      cell.rooms = cell.rooms.map((item) => (item.id == room.id ? room : item));
    },
    setSelectedCell(state, { payload: cell }: PayloadAction<CellDto | null>) {
      if (!cell) {
        state.selectedCellId = null;
        return;
      }

      state.selectedCellId = cell.id;
    },
    deleteRoom(state, { payload: room }: PayloadAction<RoomChildDto>) {
      const cell = linear2dSearch(state.map, room.parentId);
      if (!cell) {
        return;
      }
      cell.rooms = cell.rooms.filter((item) => item.id != room.id);
    },
    selectRoom(state, { payload: room }: PayloadAction<RoomChildDto>) {
      const cell = linear2dSearch(state.map, room.parentId);
      if (!cell) {
        return;
      }
      cell.currentRoom = room;
    },
    openContextMenu(
      state,
      { payload: coordinates }: PayloadAction<ContextMenu>
    ) {
      if (!state.contextMenu) {
        state.contextMenu = coordinates;
      }
    },
    closeContextMenu(state) {
      state.contextMenu = null;
    },
    toggleVisit(state) {
      const room = state.contextMenu?.room;
      if (!room) {
        return;
      }
      const cell = linear2dSearch(state.map, room.parentId);

      if (!cell) {
        return;
      }
      const foundRoom = cell.rooms.find((item) => item.id == room.id);

      if (!foundRoom) {
        return;
      }
      foundRoom.isVisited = !foundRoom?.isVisited;
    },
  },
});

export const {
  setMap,
  addRoom,
  updateRoom,
  setSelectedCell,
  deleteRoom,
  selectRoom,
  openContextMenu,
  closeContextMenu,
  toggleVisit,
} = mapSlice.actions;
export default mapSlice;
