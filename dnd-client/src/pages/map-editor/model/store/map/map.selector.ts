import { createSelector } from '@reduxjs/toolkit';
import { linear2dSearch } from 'shared/libs/utils/linear2dSearch';
import { RootState } from 'store';

export const mapSelector = (state: RootState) => state.map;

export const roomsSelector = (state: RootState) => state.map.rooms;
export const layoutSelector = (state: RootState) => state.map.map;
export const selectedCellSelector = (state: RootState) => state.map.selectedCellId;

export const getSelectedRoom = (roomId: string) =>
  createSelector([roomsSelector], (rooms) => {
    return rooms[roomId];
  });

export const getSelectedCell = () =>
  createSelector([mapSelector, selectedCellSelector], (map, selectedCellId) => {
    const cell = linear2dSearch(map.map, selectedCellId);
    return cell;
  });

export const isCellSelected = (cellId: string) =>
  createSelector([selectedCellSelector], (selectedCellId) => selectedCellId === cellId);

export const selectMap = () => createSelector([mapSelector], (map) => map.map);
export const selectMapId = () => createSelector([mapSelector], (map) => map.id);
