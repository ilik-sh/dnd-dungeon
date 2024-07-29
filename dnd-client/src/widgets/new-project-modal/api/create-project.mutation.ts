import { dndApi } from 'app/api/dnd-api';

import { AutoForm } from '../model/validation-schemas/auto-form.schema';

const createProject = dndApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<void, AutoForm>({
      invalidatesTags: ['Map'],
      query: (params) => ({ url: '/map/createMap', params }),
    }),
  }),
});

export const { useCreateProjectMutation } = createProject;
