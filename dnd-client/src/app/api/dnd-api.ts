import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { AuthResponse } from 'entities/user/model/types/auth.response';
import { LocalStorageKeys } from 'shared/libs/enums/local-storage-keys.enum';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ROUTE,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);
    if (headers.has('authorization')) {
      return headers;
    }
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem(LocalStorageKeys.RefreshToken);
    const refreshResponse = await baseQuery(
      {
        url: 'auth/refreshAccessToken',
        method: 'POST',
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions,
    );

    const tokens = refreshResponse.data;
    if (!tokens) {
      localStorage.removeItem(LocalStorageKeys.AccessToken);
      localStorage.removeItem(LocalStorageKeys.RefreshToken);
    }

    localStorage.setItem(LocalStorageKeys.AccessToken, tokens.accessToken);
    localStorage.setItem(LocalStorageKeys.RefreshToken, tokens.refreshToken);
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const dndApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Map'],
  endpoints: () => ({}),
});
