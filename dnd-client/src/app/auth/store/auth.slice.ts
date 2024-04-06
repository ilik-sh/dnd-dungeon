import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.state";
import { signIn, signUp } from "./auth.actions";

const initialState: AuthState = {
  isAuthenticated: false,
  isPending: {
    signIn: false,
    signUp: false,
  },
  errors: {
    signIn: null,
    signUp: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, _) => {
        state.errors.signIn = null;
        state.isPending.signIn = true;
      })
      .addCase(signIn.fulfilled, (state, _) => {
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isPending.signIn = false;
        state.errors.signIn = payload?.message || null;
      })
      .addCase(signUp.pending, (state, _) => {
        state.errors.signUp = null;
        state.isPending.signUp = true;
      })
      .addCase(signUp.fulfilled, (state, _) => {
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isPending.signUp = false;
        state.errors.signUp = payload?.message || null;
      });
  },
});

export default authSlice;
