import * as yup from 'yup';

export const importModelFormSchema = yup.object().shape({
  modelUrl: yup.string().required('Model is required'),
  name: yup.string().required('Texture name is required'),
  normalTextureUrl: yup.string().required('Normal texture is required'),
  colorTextureUrl: yup.string().required('Color texture is required'),
});

export type ImportModelFormYup = yup.InferType<typeof importModelFormSchema>;
