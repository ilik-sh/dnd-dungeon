import { dndApi } from 'app/api/dnd-api';

const userApi = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<string, void>({
      query: () => ({ url: '/auth/getUserProfileFromJwt' }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
