import React, { FC } from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { Control, useController } from "react-hook-form";
import { camelize } from "utils/camelize";

interface CustomTextFieldProps extends TextFieldProps<"standard"> {
  name: string;
  control: Control<any, any>;
}

const TextField: FC<CustomTextFieldProps> = ({ name, control, ...props }) => {
  const { field } = useController({
    name: camelize(name),
    control,
    rules: { required: true },
  });
  return (
    <MUITextField
      {...props}
      {...field}
      value={field.value}
      name={name}
      fullWidth
      id={camelize(name)}
      label={name}
    />
  );
};

export default TextField;
