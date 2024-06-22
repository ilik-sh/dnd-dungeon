import { FC } from 'react';
import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import { Control, useController } from 'react-hook-form';
import { camelize } from 'utils/camelize';

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
      onChange={(e) => {
        console.log('change');
        if (submit) {
          submit();
        }
        field.onChange(e);
      }}
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
