import * as yup from "yup";
import { InferType } from "yup";

export const roomFormSchema = yup.object().shape({
  level: yup.number().min(1).max(5).required(),
  type: yup.string().required(),
  description: yup.string().required(),
});

export type RoomFormYup = InferType<typeof roomFormSchema>;
