import { dndApi } from 'app/api/dnd-api';

import { AuthResponse } from '../../../entities/user/model/responses/auth.response';

import { LocalStorageKeys } from 'shared/libs/enums/local-storage-keys.enum';

import { SignInForm } from '../model/validation-schemas/sign-in-form.schema';

const signIn = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInForm>({
      queryFn: async (body: SignInForm, api, extraOptions, baseQuery) => {
        const response = await baseQuery({ url: 'auth/signIn', method: 'POST', body });
        if (response.error) {
          return { error: response.error };
        }
        const authResponse = response.data;

        localStorage.setItem(LocalStorageKeys.RefreshToken, authResponse.refreshToken);
        localStorage.setItem(LocalStorageKeys.AccessToken, authResponse.accessToken);
        return { data: authResponse };
      },
    }),
  }),
});

export const { useSignInMutation } = signIn;
