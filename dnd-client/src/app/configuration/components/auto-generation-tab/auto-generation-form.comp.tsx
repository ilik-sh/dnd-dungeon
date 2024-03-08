import { Button, Paper } from "@mui/material";
import { AutoGenerationFormYup } from "app/configuration/validation-schemas/auto-generation-form.schema";
import TextField from "components/text-field.comp";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";

type AutoGenerationFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<AutoGenerationFormYup, any>;
  validationErorrs: FieldErrors<AutoGenerationFormYup>;
};

export default function AutoGenerationForm({
  onSubmit,
  control,
  validationErorrs,
}: AutoGenerationFormProps) {
  return (
    <Paper>
      <form onSubmit={onSubmit} noValidate>
        <TextField
          control={control}
          type="number"
          name="Map size"
          error={!!validationErorrs.mapSize}
          helperText={validationErorrs.mapSize?.message}
        />
        <TextField
          control={control}
          type="number"
          name="Tunnel length"
          error={!!validationErorrs.tunnelLength}
          helperText={validationErorrs.tunnelLength?.message}
        />
        <TextField
          control={control}
          type="number"
          name="Crossroad chance"
          error={!!validationErorrs.crossroadChance}
          helperText={validationErorrs.crossroadChance?.message}
        />
        <Button type="submit" variant="contained" fullWidth>
          Generate
        </Button>
      </form>
    </Paper>
  );
}
