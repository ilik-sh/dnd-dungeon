import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const roomsSelector = (state: RootState) => state.addCell.rooms;
export const cellSelector = (state: RootState) => state.addCell.cell;

export const getRooms = () =>
  createSelector([roomsSelector], (roomsDictionary) => {
    return Object.keys(roomsDictionary).map((key) => roomsDictionary[key]);
  });
