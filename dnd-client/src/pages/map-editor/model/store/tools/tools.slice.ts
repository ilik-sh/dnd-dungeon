import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToolsState } from '../../types/tools.state';

const initialState: ToolsState = {
  tool: null,
};

const toolsSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setTool(state, { payload }: PayloadAction<{ tool: string | null }>) {
      state.tool = payload.tool;
    },
  },
});

export const { setTool } = toolsSlice.actions;
export default toolsSlice;
