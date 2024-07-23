import { dndApi } from 'app/api/dnd-api';
import { AuthResponse } from 'entities/user/model/types/auth.response';
import { LocalStorageKeys } from 'shared/libs/enums/local-storage-keys.enum';

import { SignUpForm } from '../model/validation-schemas/sign-up-form.schema';

const signUp = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, SignUpForm>({
      queryFn: async (body: SignUpForm, api, extraOptions, baseQuery) => {
        const response = await baseQuery({ url: 'auth/signUp', method: 'POST', body });
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

export const { useSignUpMutation } = signUp;
