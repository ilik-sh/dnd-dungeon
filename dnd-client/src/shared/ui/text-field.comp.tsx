import { FC } from 'react';
import { Control, useController } from 'react-hook-form';

import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import { camelize } from 'shared/libs/utils/camelize';

interface CustomTextFieldProps extends TextFieldProps<'standard'> {
  name: string;
  control: Control<any, any>;
  submit?: () => void;
}

const TextField: FC<CustomTextFieldProps> = ({ name, control, submit, ...props }) => {
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
      onChange={field.onChange}
      onBlur={(e) => {
        field.onBlur(e);
        if (submit) {
          submit();
        }
      }}
      id={camelize(name)}
      label={name}
      type="input"
    />
  );
};

export default TextField;
