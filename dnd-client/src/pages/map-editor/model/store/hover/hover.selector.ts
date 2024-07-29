import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const hoverSelector = (state: RootState) => state.hover;

export const hoveringItemSelector = (state: RootState) => state.hover.hoveringElementId;

export const isHoveringOverObject = (objectId: string) =>
  createSelector([hoveringItemSelector], (elementId) => {
    return objectId === elementId;
  });
