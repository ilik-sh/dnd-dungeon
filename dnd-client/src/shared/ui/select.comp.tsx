import { useState } from 'react';
import { Control, useController } from 'react-hook-form';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  styled,
} from '@mui/material';

import { camelize } from 'shared/libs/utils/camelize';

type SelectProps = MuiSelectProps & {
  control: Control<any, any>;
  name: string;
  selectValues: any[];
  submit?: React.FormEventHandler;
};

const StyledFormControl = styled(FormControl)(() => ({
  minWidth: 120,
  flex: '1 1 20%',
}));

export default function Select({ control, name, selectValues, submit, ...props }: SelectProps) {
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
        labelId={camelize(name)}
        id={camelize(name)}
        label={name}
        value={field.value}
        name={camelize(name)}
        onChange={(e) => {
          field.onChange(e);
          if (submit) {
            submit();
          }
        }}
      >
        {selectValues.map((value) => (
          <MenuItem key={value} value={value as string}>
            {value}
          </MenuItem>
        ))}
      </MuiSelect>
    </StyledFormControl>
  );
}
