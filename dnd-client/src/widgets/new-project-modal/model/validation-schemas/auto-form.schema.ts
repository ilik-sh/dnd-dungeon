import * as yup from 'yup';

export const autoFormSchema = yup.object().shape({
  mapSize: yup
    .number()

    .required('Map size is required')
    .min(1, 'Map size must not be less than 1')
    .max(2000, 'Map size must not be more than 20')
    .typeError('Map size must be a number'),
  tunnelLength: yup
    .number()
    .typeError('Tunnel length must be a number')
    .required('Tunnel length is required')
    .lessThan(yup.ref('mapSize'), 'Tunnel length must not be greater then map size')
    .moreThan(0, 'Tunnel length must be positive'),
  crossroadChance: yup
    .number()
    .typeError('Crossroad chance must be a number')
    .required('Crossroad chance is required')
    .min(1, 'Chance should be within 1-100 range')
    .max(100, 'Chance should be within 1-100 range'),
});

export type AutoForm = yup.InferType<typeof autoFormSchema>;
