import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../types/auth.state';

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
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default authSlice;
