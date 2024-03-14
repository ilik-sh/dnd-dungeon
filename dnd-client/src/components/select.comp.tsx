import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  styled,
} from "@mui/material";
import React from "react";
import { Control, useController, useWatch } from "react-hook-form";
import { camelize } from "utils/camelize";

interface SelectProps extends MuiSelectProps<string> {
  control: Control<any, any>;
  name: string;
  selectValues: any[];
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  flex: "1 1 20%",
}));

export default function Select({
  control,
  name,
  selectValues,
  ...props
}: SelectProps) {
  const { field } = useController({
    name: camelize(name),
    control,
  });
  return (
    <StyledFormControl>
      <InputLabel id={camelize(name)}>{name}</InputLabel>
      <MuiSelect
        {...field}
        {...props}
        name={name}
        id={camelize(name)}
        label={camelize(name)}
      >
        {selectValues.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </MuiSelect>
    </StyledFormControl>
  );
}
