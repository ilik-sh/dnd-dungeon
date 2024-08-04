import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const toolsSelector = (state: RootState) => state.tools;

export const toolSelector = (state: RootState) => state.tools.tool;

export const isAddCellSelected = () =>
  createSelector([toolSelector], (tool) => {
    return tool === 'addCell';
  });

export const getSelectedTool = () =>
  createSelector([toolSelector], (tool) => {
    return tool + '';
  });
