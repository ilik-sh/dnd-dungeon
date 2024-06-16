import { Direction } from 'enums/directions.enum';
import * as yup from 'yup';

export const roomFormSchema = yup.object().shape({
  level: yup.number().min(1).max(5).required(),
  type: yup.string().required(),
  description: yup.string().optional(),
  roomDirections: yup.mixed<Record<Direction, boolean>>().required(),
  visited: yup.boolean().required(),
});

export type RoomFormYup = yup.InferType<typeof roomFormSchema>;
