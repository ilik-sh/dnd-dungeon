import { dndApi } from 'app/api/dnd-api';

import { MapProfile } from '../model/types/map-profile.type';

const updateMapProfile = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMapProfile: builder.mutation<void, Partial<MapProfile>>({
      query: (map) => ({ url: 'map/updateMapProfile', body: map, method: 'PATCH' }),
    }),
  }),
});

export const { useUpdateMapProfileMutation } = updateMapProfile;
