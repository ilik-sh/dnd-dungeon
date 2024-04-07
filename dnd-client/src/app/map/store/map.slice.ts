import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MapState } from "../types/map.state";
import { linear2dSearch } from "utils/linear2dSearch";
import { RoomChildDto } from "app/configuration/types/room-child.dto";
import { CellDto } from "app/configuration/types/cell.dto";
import { ContextMenu } from "../types/context-menu.type";

const initialState: MapState = {
  map: [],
  selectedCellId: null,
  multipleSelection: false,
  multipleSelectedCells: [],
  contextMenu: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap(state, { payload }) {
      state.map = payload.map;
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
    selectRoomAmongMultipleSelectedCells(
      state,
      { payload: roomNumber }: PayloadAction<number>
    ) {
      state.map.map((inner) => {
        inner.map((cell) => {
          if (state.multipleSelectedCells.includes(cell.id)) {
            if (cell.rooms.length < roomNumber) {
              throw Error;
            }
            cell.currentRoom = cell.rooms[roomNumber - 1];
          }
        });
      });
    },
    addMultiplySelectedCell(state, { payload: cell }: PayloadAction<CellDto>) {
      const isPresent = state.multipleSelectedCells.includes(cell.id);
      if (isPresent) {
        state.multipleSelectedCells = state.multipleSelectedCells.filter(
          (item) => cell.id !== item
        );
      } else {
        state.multipleSelectedCells.push(cell.id);
      }
    },
    toggleMultipleSelection(state) {
      state.multipleSelectedCells = [];
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
  toggleMultipleSelection,
  addMultiplySelectedCell,
  selectRoomAmongMultipleSelectedCells,
} = mapSlice.actions;
export default mapSlice;
