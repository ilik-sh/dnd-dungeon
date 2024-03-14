import { RootState } from "store";

export const manualGenerationConfigSelector = (state: RootState) =>
  state.manualGenerationConfig;
