import { dndApi } from 'app/api/dnd-api';

import { MapLayout } from '../model/types/map-layout.type';

const updateMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMap: builder.mutation<void, Partial<MapLayout>>({
      query: (map) => ({ url: 'map/updateMap', body: map, method: 'POST' }),
    }),
  }),
});

export const { useUpdateMapMutation } = updateMap;
