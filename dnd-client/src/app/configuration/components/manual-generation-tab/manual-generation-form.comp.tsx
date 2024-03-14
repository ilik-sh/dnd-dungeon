import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ManualGenerationFormYup } from "app/configuration/validation-schemas/manual-generation-form.schema";
import TextField from "components/text-field.comp";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { manualGenerationConfigSelector } from "app/configuration/store/manual-generation/manual-generation-config.selector";
import { setMapSize } from "app/configuration/store/manual-generation/manual-generation-config.slice";

type ManualFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<ManualGenerationFormYup, any>;
  validationErorrs: FieldErrors<ManualGenerationFormYup>;
};

const mapSizes = [4, 5, 6, 7];

export default function ManualGenerationForm({
  onSubmit,
  control,
  validationErorrs,
}: ManualFormProps) {
  const dispatch = useAppDispatch();
  const { mapSize } = useAppSelector(manualGenerationConfigSelector);

  const onChange = (event: SelectChangeEvent) => {
    const mapSize = event.target.value;
    dispatch(setMapSize({ mapSize }));
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Select id="mapSize" value={mapSize.toString()} onChange={onChange}>
        {mapSizes.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </form>
  );
}
