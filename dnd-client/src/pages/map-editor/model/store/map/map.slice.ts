import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CellDto } from 'entities/cell/model/types/cell.dto';
import { RoomDto } from 'entities/room';

import { linear2dSearch } from 'shared/libs/utils/linear2dSearch';

import { MapState } from '../../types/map.state';

const initialState: MapState = {
  map: [],
  rooms: {},
  selectedCellId: null,
  mapName: 'Untitled',
  id: '',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    //MAP Actions
    setMap(state, { payload }) {
      state.map = payload.mapLayout;
      state.mapName = payload.name;
      state.rooms = payload.mapInfo;
      state.id = payload.id;
    },
    setMapName(state, { payload: name }: PayloadAction<string>) {
      state.mapName = name;
    },

    //CELL Actions
    setSelectedCell(state, { payload: cell }: PayloadAction<CellDto | null>) {
      if (!cell) {
        state.selectedCellId = null;
        return;
      }

      state.selectedCellId = cell.id;
    },
    addCell(
      state,
      { payload }: PayloadAction<{ room: RoomDto; cell: CellDto; coordinates: { x: number; y: number } }>,
    ) {
      state.rooms[payload.room.id] = payload.room;
      state.map[payload.coordinates.x][payload.coordinates.y] = payload.cell;
    },
    removeCell(state, { payload }: PayloadAction<{ cell: CellDto; coordinates: { x: number; y: number } }>) {
      if (state.selectedCellId === payload.cell.id) {
        state.selectedCellId = null;
      }
      payload.cell.rooms.map((roomId) => {
        delete state.rooms[roomId];
      });
      state.map[payload.coordinates.x][payload.coordinates.y] = null;
    },

    // ROOM Actions
    selectRoom(state, { payload }: PayloadAction<{ room: RoomDto; cell: CellDto }>) {
      const cell = linear2dSearch(state.map, state.selectedCellId);
      if (!cell) {
        return;
      }
      cell.currentRoom = payload.room.id;
    },
    updateRoom(state, { payload: room }: PayloadAction<RoomDto>) {
      state.rooms[room.id] = room;
    },
    addRoom(state, { payload }) {
      state.rooms[payload.room.id] = payload.room;
      const cell = linear2dSearch(state.map, state.selectedCellId);
      if (!cell) {
        return;
      }
      cell.rooms.push(payload.room.id);
    },
    deleteRoom(state, { payload }: PayloadAction<{ room: RoomDto; cell: CellDto }>) {
      delete state.rooms[payload.room.id];
      const cell = linear2dSearch(state.map, payload.cell.id);
      if (!cell) {
        return;
      }

      cell.rooms = cell.rooms.filter((item) => item != payload.room.id);
    },
    extendMap(state, { payload }: PayloadAction<{ direction: string }>) {
      const direction = payload.direction;

      if (direction === 'top') {
        state.map.map((item) => item.unshift(null));
      }
      if (direction === 'bottom') {
        state.map.map((item) => item.push(null));
      }
      if (direction === 'left') {
        state.map.unshift(new Array(state.map[0].length).fill(null));
      }
      if (direction === 'right') {
        state.map.push(new Array(state.map[0].length).fill(null));
      }
    },
  },
});

export const {
  setMap,
  setMapName,
  addRoom,
  updateRoom,
  setSelectedCell,
  deleteRoom,
  selectRoom,
  addCell,
  removeCell,
  extendMap,
} = mapSlice.actions;
export default mapSlice;
