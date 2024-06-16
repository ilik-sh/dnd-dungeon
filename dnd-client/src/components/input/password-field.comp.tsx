import React, { FC } from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';
import { useState } from 'react';
import { Control, Controller, useController } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { camelize } from 'utils/camelize';

interface PasswordFieldProps extends TextFieldProps<'standard'> {
  name: string;
  control: Control<any, any>;
}

const PointerDiv = styled('div')({
  cursor: 'pointer',
});

const PasswordField: FC<PasswordFieldProps> = ({ name, control, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { field } = useController({
    name: camelize(name),
    control,
    rules: { required: true },
  });

  return (
    <TextField
      {...props}
      fullWidth
      label={name}
      {...field}
      type={showPassword ? 'text' : 'password'}
      id={camelize(name)}
      InputProps={{
        endAdornment: (
          <PointerDiv onClick={handleTogglePasswordVisibility}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </PointerDiv>
        ),
      }}
    />
  );
};

export default PasswordField;
