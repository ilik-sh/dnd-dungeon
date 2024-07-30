import { dndApi } from 'app/api/dnd-api';
import dayjs from 'dayjs';

import { GetUserMapsResponse } from '../model/responses/get-user-maps.response';

const userMaps = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMaps: builder.query<GetUserMapsResponse, void>({
      providesTags: ['Map'],
      query: () => ({ url: 'map/getAllOfUser', params: { page: 0 } }),
      transformResponse: (response: GetUserMapsResponse) => {
        response.map((map) => {
          const date = dayjs(map.createdAt).toDate();
          const createdAt = date.toLocaleDateString();
          map.createdAt = createdAt;
        });
        return response;
      },
    }),
  }),
});

export const { useGetUserMapsQuery } = userMaps;
