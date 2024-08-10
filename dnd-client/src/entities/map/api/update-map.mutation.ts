import { dndApi } from 'app/api/dnd-api';

const updateMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMap: builder.mutation({
      query: (map) => ({ url: 'map/updateMap', body: map, method: 'POST' }),
    }),
  }),
});

export const { useUpdateMapMutation } = updateMap;
