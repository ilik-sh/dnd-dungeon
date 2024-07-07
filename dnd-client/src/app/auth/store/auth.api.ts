import { dndApi } from 'api/dnd-api';
import { LocalStorageKeys } from 'enums/local-storage-keys.enum';

import { AuthResponse } from '../types/responses/auth.response';
import { SignInForm } from '../validation-schemas/sign-in-form.schema';
import { SignUpForm } from '../validation-schemas/sign-up-form.schema';

const authApi = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInForm>({
      queryFn: async (body: SignInForm, api, extraOptions, baseQuery) => {
        const response = await baseQuery({ url: 'auth/signIn', method: 'POST', body });
        if (response.error) {
          return { error: response.error };
        }
        const authResponse = response.data;

        localStorage.setItem(LocalStorageKeys.RefreshToken, authResponse[1].token);
        localStorage.setItem(LocalStorageKeys.AccessToken, authResponse[0].token);
        return { data: authResponse };
      },
    }),
    signUp: builder.mutation<AuthResponse, SignUpForm>({
      queryFn: async (body: SignUpForm, api, extraOptions, baseQuery) => {
        const response = await baseQuery({ url: 'auth/signUp', method: 'POST', body });
        if (response.error) {
          return { error: response.error };
        }
        const authResponse = response.data;

        localStorage.setItem(LocalStorageKeys.RefreshToken, authResponse[1].token);
        localStorage.setItem(LocalStorageKeys.AccessToken, authResponse[0].token);
        return { data: authResponse };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
