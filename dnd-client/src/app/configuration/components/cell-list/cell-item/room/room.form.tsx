import { Button, styled } from "@mui/material";

import { RoomFormYup } from "app/configuration/validation-schemas/room-form.schema";
import Select from "components/select.comp";
import TextField from "components/text-field.comp";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";

type RoomFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<RoomFormYup, any>;
  validationErorrs: FieldErrors<RoomFormYup>;
};

const roomTypes = ["peace", "neutral", "evil", "loot", "quest"];
const roomLevels = [1, 2, 3, 4, 5];

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const SelectPart = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  gap: "20px",
}));

const DescriptionPart = styled("div")({
  width: "100%",
});

export default function RoomForm({
  onSubmit,
  control,
  validationErorrs,
}: RoomFormProps) {
  return (
    <StyledForm onSubmit={onSubmit} noValidate>
      <SelectPart>
        <Select
          control={control}
          name="Level"
          selectValues={roomLevels}
          error={!!validationErorrs.level}
        />
        <Select
          control={control}
          name="Type"
          selectValues={roomTypes}
          error={!!validationErorrs.type}
        />
      </SelectPart>
      <DescriptionPart>
        <TextField
          control={control}
          name="Description"
          fullWidth
          multiline
          rows={4}
          error={!!validationErorrs.description}
          helperText={validationErorrs.description?.message}
        ></TextField>
      </DescriptionPart>
      <Button variant="contained" type="submit">
        Apply
      </Button>
    </StyledForm>
  );
}
