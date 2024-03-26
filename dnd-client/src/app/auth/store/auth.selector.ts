import { useAppSelector } from "hooks/redux.hooks";
import { RootState } from "store";

export const authSelector = (state: RootState) => state.auth;
