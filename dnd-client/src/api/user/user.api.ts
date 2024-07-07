import { dndApi } from 'api/dnd-api';

const userApi = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<string, void>({
      query: () => ({ url: '/auth/getUser' }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
