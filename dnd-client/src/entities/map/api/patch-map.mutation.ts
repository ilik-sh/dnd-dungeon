import { dndApi } from 'app/api/dnd-api';

import { jsonPatchTransformer } from '../libs/utils/json-patch-transformer';
import { Map } from '../model/types/map.type';

const patchMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    patchMap: builder.mutation<void, Partial<Map>>({
      query: (map) => ({
        url: 'map/patchMap',
        body: jsonPatchTransformer(map),
        method: 'PATCH',
        headers: { 'content-type': 'application/json-patch+json' },
      }),
    }),
  }),
});

export const { usePatchMapMutation } = patchMap;
