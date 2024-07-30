import { dndApi } from 'app/api/dnd-api';

const recreateMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    recreateMap: builder.mutation({
      query: (map) => ({ url: 'map/recreateMap', body: map, method: 'PATCH' }),
    }),
  }),
});

export const { useRecreateMapMutation } = recreateMap;
