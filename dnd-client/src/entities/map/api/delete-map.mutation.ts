import { dndApi } from 'app/api/dnd-api';

const deleteMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteMap: builder.mutation<void, string>({
      invalidatesTags: ['Map'],
      query: (mapId) => ({ url: 'map/deleteMapById', params: { id: mapId }, method: 'DELETE' }),
    }),
  }),
});

export const { useDeleteMapMutation } = deleteMap;
