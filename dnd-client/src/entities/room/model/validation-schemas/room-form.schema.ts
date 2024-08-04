import * as yup from 'yup';

import { Direction } from 'shared/libs/enums/directions.enum';

export const roomFormSchema = yup.object().shape({
  id: yup.string().required(),
  level: yup.number().min(1).max(5).required(),
  type: yup.string().required(),
  description: yup.string().optional(),
  roomDirections: yup.mixed<Record<Direction, boolean>>().required(),
  visited: yup.boolean().required(),
  textureUrl: yup.string().required(),
});

export type RoomFormYup = yup.InferType<typeof roomFormSchema>;
