import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RoomDto } from 'entities/room';

import { generateUniqueObject } from 'shared/libs/utils/generate-unique-object';
import { transformDictionaryToArray } from 'shared/libs/utils/transformDictionaryToArray';

import { generateDefaultCell } from '../../default-objects/default-cell';
import { AddCellState } from '../../types/add-cell.state';
import { HoverState } from '../../types/hover.state';

const defaultObject = generateDefaultCell();

const initialState: AddCellState = {
  cell: defaultObject.cell,
  rooms: defaultObject.roomDictionary,
};

const addCellSlice = createSlice({
  name: 'addCell',
  initialState,
  reducers: {
    deleteRoom(state, { payload }: PayloadAction<{ room: RoomDto }>) {
      state.cell.rooms.filter((roomId) => roomId !== payload.room.id);
      delete state.rooms[payload.room.id];
    },
    addRoom(state, { payload }: PayloadAction<{ room: RoomDto }>) {
      state.rooms[payload.room.id] = payload.room;
      state.cell.rooms.push(payload.room.id);
    },
    updateRoom(state, { payload }: PayloadAction<{ room: RoomDto }>) {
      state.rooms[payload.room.id] = payload.room;
    },
    selectRoom(state, { payload }: PayloadAction<{ room: RoomDto }>) {
      state.cell.currentRoom = payload.room.id;
    },
    refreshId(state) {
      const roomArray = transformDictionaryToArray(state.rooms);
      const object = generateUniqueObject(state.cell, roomArray);
      state.cell = object.cell;
      state.rooms = object.roomsDictionary;
    },
  },
});

export const { deleteRoom, addRoom, updateRoom, selectRoom, refreshId } = addCellSlice.actions;
export default addCellSlice;
