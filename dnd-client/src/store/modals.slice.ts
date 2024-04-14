import { createSlice } from '@reduxjs/toolkit';
import { ModalsState } from './type/modals.state';

const initialState: ModalsState = {
  open: {
    signIn: false,
    signUp: false,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.open[payload] = true;
    },
    closeModal(state, { payload }) {
      state.open[payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice;
