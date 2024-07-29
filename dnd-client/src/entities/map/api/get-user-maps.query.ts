import { dndApi } from 'app/api/dnd-api';
import dayjs from 'dayjs';

const userMaps = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMaps: builder.query({
      providesTags: (result) => (result ? [result.map(({ id }) => ({ type: 'Map', id })), 'Map'] : ['Map']),
      query: () => ({ url: 'map/getAllOfUser' }),
      transformResponse: (response) => {
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
