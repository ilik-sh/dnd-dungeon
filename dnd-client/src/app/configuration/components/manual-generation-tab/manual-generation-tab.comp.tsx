import React from "react";
import ManualGenerationForm from "./manual-generation-form.comp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { manualGenerationFormSchema } from "../../validation-schemas/manual-generation-form.schema";
import ConfigureMap from "./configure-map.comp";
import CellList from "../cell-list/cell-list.comp";
import Sidebar from "../sidebar/sidebar.comp";

type Props = {};

export default function ManualGenerationTab({}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(manualGenerationFormSchema),
  });

  const onSubmit = () => {};
  return (
    <>
      <Sidebar />
      <ManualGenerationForm
        control={control}
        validationErorrs={errors}
        onSubmit={handleSubmit(onSubmit)}
      />
      <ConfigureMap />
    </>
  );
}
