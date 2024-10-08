import { dndApi } from 'app/api/dnd-api';

const getMap = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    getMap: builder.query({
      query: (mapId) => ({
        url: `map/getByMapId`,
        params: { id: mapId },
      }),

      // transformResponse: (response) => {
      //   console.log(response);
      //   response.mapLayout.map((item, column) =>
      //     item.map((cell, row) => {
      //       if (response.mapInfo[cell.currentRoom].type === 'ABSENCE') {
      //         delete response.mapInfo[cell.currentRoom];
      //         response.mapLayout[column][row] = null;
      //       }
      //     }),
      //   );
      //   return { ...response };
      // },
    }),
  }),
});

export const { useGetMapQuery, useLazyGetMapQuery } = getMap;
