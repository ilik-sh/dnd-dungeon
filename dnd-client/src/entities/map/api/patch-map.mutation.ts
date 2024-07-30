import { dndApi } from 'app/api/dnd-api';

import { MapProfile } from '../model/types/map-profile.type';

const patchMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    patchMap: builder.mutation<void, Partial<MapProfile>>({
      query: (map) => ({ url: 'map/updateMapPartly', body: map, method: 'PATCH' }),
    }),
  }),
});

export const { usePatchMapMutation } = patchMap;
