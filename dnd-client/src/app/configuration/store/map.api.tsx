import { dndApi } from 'api/dnd-api';
import { LocalStorageKeys } from 'enums/local-storage-keys.enum';

import { AuthResponse } from '../types/responses/auth.response';

const mapApi = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getMap: builder.query<void, void>({
      query: () => ({ url: 'auto/generateMapLayout', params: { mapSize: 4, tunnelLength: 3, crossroadChance: 70 } }),
    }),
  }),
});

export const { useGetMapQuery } = mapApi;
