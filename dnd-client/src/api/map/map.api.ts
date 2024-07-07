import { dndApi } from 'api/dnd-api';

const mapApi = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMaps: builder.query({
      query: () => ({ url: 'map/' }),
    }),
    getMap: builder.query({
      query: (mapId) => ({
        url: `map/${mapId}`,
      }),
    }),
  }),
});
