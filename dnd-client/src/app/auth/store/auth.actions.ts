import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInForm } from '../validation-schemas/sign-in-form.schema';
import { ApiError } from '../types/api.error';
import { SignUpForm } from '../validation-schemas/sign-up-form.schema';
import { AuthResponse } from '../types/responses/auth.response';
import { axiosClient } from 'api/api';
import { LocalStorageKeys } from 'enums/local-storage-keys.enum';
import { handleApiError } from 'api/handle-api-error';

export const signIn = createAsyncThunk<AuthResponse, SignInForm, { rejectValue: ApiError }>(
  'signIn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('auth/signIn', data);
      localStorage.setItem(LocalStorageKeys.RefreshToken, response.data.refreshToken);
      localStorage.setItem(LocalStorageKeys.AccessToken, response.data.accessToken);

      return response.data as AuthResponse;
    } catch (e) {
      return rejectWithValue(handleApiError(e));
    }
  },
);

export const signUp = createAsyncThunk<AuthResponse, SignUpForm, { rejectValue: ApiError }>(
  'signUp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post<AuthResponse>('auth/signUp', data);

      localStorage.setItem(LocalStorageKeys.RefreshToken, response.data.refreshToken);
      localStorage.setItem(LocalStorageKeys.AccessToken, response.data.accessToken);

      return response.data as AuthResponse;
    } catch (e) {
      return rejectWithValue(handleApiError(e));
    }
  },
);
