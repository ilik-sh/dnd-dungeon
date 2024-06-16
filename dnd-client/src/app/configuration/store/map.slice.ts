import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapState } from '../types/map.state';
import { linear2dSearch } from 'utils/linear2dSearch';
import { CellDto } from 'app/configuration/types/cell.dto';
import { RoomDto } from 'types/room.dto';

const initialState: MapState = {
  map: [],
  rooms: {},
  selectedCellId: null,
  mapName: 'Untitled',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap(state, { payload }) {
      state.map = payload.map;
      state.mapName = payload.name;
      state.rooms = payload.rooms;
    },
    addRoom(state, { payload }) {
      state.rooms[payload.room.id] = payload.room;
      const cell = linear2dSearch(state.map, state.selectedCellId);
      if (!cell) {
        return;
      }
      cell.rooms.push(payload.room.id);
    },
    updateRoom(state, { payload: room }: PayloadAction<RoomDto>) {
      state.rooms[room.id] = room;
    },
    setSelectedCell(state, { payload: cell }: PayloadAction<CellDto | null>) {
      if (!cell) {
        state.selectedCellId = null;
        return;
      }

      state.selectedCellId = cell.id;
    },
    deleteRoom(state, { payload }: PayloadAction<{ room: RoomDto; cell: CellDto }>) {
      delete state.rooms[payload.room.id];
      const cell = linear2dSearch(state.map, payload.cell.id);
      if (!cell) {
        return;
      }

      cell.rooms = cell.rooms.filter((item) => item != payload.room.id);
    },
    selectRoom(state, { payload }: PayloadAction<{ room: RoomDto; cell: CellDto }>) {
      const cell = linear2dSearch(state.map, state.selectedCellId);
      if (!cell) {
        return;
      }
      cell.currentRoom = payload.room.id;
    },
    setMapName(state, { payload: name }: PayloadAction<string>) {
      state.mapName = name;
    },
  },
});

export const { setMap, setMapName, addRoom, updateRoom, setSelectedCell, deleteRoom, selectRoom } = mapSlice.actions;
export default mapSlice;
