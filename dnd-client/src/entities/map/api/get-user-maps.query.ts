import { dndApi } from 'app/api/dnd-api';
import dayjs from 'dayjs';

const userMaps = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMaps: builder.query({
      query: () => ({ url: 'map/getAllOfUser' }),
      transformResponse: (response) => {
        console.log(response);
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
