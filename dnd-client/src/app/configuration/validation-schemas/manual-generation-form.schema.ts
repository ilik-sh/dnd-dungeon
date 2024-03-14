import * as yup from "yup";
import { InferType } from "yup";

export const manualGenerationFormSchema = yup.object().shape({
  mapSize: yup
    .number()
    .min(4, "Map size must not be less than 4")
    .max(7, "Map size must not be greater than 7")
    .required("Map size is required"),
});

export type ManualGenerationFormYup = InferType<
  typeof manualGenerationFormSchema
>;
