import { dndApi } from 'app/api/dnd-api';

import { GetUserResponse } from '../model/responses/get-user.response';

const userApi = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserResponse, void>({
      query: () => ({ url: '/auth/getUserProfileFromJwt' }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
