import React from "react";
import AutoGenerationForm from "./auto-generation-form.comp";
import { useForm } from "react-hook-form";
import { AutoGeneration } from "app/configuration/types/forms/auto-generation.form";
import { yupResolver } from "@hookform/resolvers/yup";
import { autoGenerationFormSchema } from "app/configuration/validation-schemas/auto-generation-form.schema";

type Props = {};

export default function AutoGenerationTab({}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AutoGeneration>({
    resolver: yupResolver(autoGenerationFormSchema),
    mode: "all",
    defaultValues: { tunnelLength: 3, mapSize: 4, crossroadChance: 50 },
  });

  const onSubmit = () => {
    console.log(errors);
  };
  return (
    <div>
      <AutoGenerationForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        validationErorrs={errors}
      />
    </div>
  );
}
