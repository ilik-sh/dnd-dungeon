import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const authSelector = (state: RootState) => state.auth;
