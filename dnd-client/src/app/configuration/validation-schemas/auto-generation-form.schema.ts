import * as yup from "yup";
import { InferType } from "yup";

export const autoGenerationFormSchema = yup.object().shape({
  tunnelLength: yup
    .number()
    .min(0, "Tunnel length must not be lower than 0")
    .lessThan(
      yup.ref("mapSize"),
      "Tunnel length must not be greater than map size"
    )
    .required("Tunnel length is required"),
  crossroadChance: yup
    .number()
    .min(0, "Crossroad chance must not be lower than 0")
    .max(100, "Crossroad chance must not be greater than 100")
    .required("Crossroad chance is required"),
  mapSize: yup
    .number()
    .min(4, "Map size must not be less than 4")
    .max(7, "Map size must not be greater than 7")
    .required("Map size is required"),
});

export type AutoGenerationFormYup = InferType<typeof autoGenerationFormSchema>;
