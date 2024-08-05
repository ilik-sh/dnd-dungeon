import { dndApi } from 'app/api/dnd-api';

import { GetMapResponse } from '../model/responses/get-map.response';

const getMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getMap: builder.query<GetMapResponse, string>({
      query: (mapId) => ({
        url: `map/getByMapId`,
        params: { id: mapId },
      }),
    }),
  }),
});

export const { useGetMapQuery, useLazyGetMapQuery } = getMap;
