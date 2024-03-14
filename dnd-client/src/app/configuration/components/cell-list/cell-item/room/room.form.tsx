import { Button, styled } from "@mui/material";

import { RoomFormYup } from "app/configuration/validation-schemas/room-form.schema";
import Select from "components/select.comp";
import TextField from "components/text-field.comp";
import { RoomType } from "enums/room-type.enum";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import HexDirections from "./hex-directions.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { mapSelector } from "app/map/store/map.selector";

type RoomFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<RoomFormYup, any>;
  validationErorrs: FieldErrors<RoomFormYup>;
};

const roomLevels = [1, 2, 3, 4, 5];

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
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
          variant="outlined"
          control={control}
          name="Level"
          selectValues={roomLevels}
          error={!!validationErorrs.level}
        />
        <Select
          control={control}
          name="Type"
          selectValues={Object.values(RoomType)}
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
      <HexDirections control={control}></HexDirections>
      <Button variant="contained" type="submit" fullWidth>
        Apply
      </Button>
    </StyledForm>
  );
}
