import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HoverState } from '../../types/hover.state';

const initialState: HoverState = {
  hoveringElementId: '',
};

const hoverSlice = createSlice({
  name: 'hover',
  initialState,
  reducers: {
    setHoveringElement(state, { payload }: PayloadAction<{ hoveringElementId: string }>) {
      state.hoveringElementId = payload.hoveringElementId;
    },
  },
});

export const { setHoveringElement } = hoverSlice.actions;
export default hoverSlice;
