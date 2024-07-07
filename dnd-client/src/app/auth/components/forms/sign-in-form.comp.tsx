import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { LoadingButton as Button } from '@mui/lab';
import { styled } from '@mui/material';
import { SignInForm as SignInFormFields } from 'app/auth/validation-schemas/sign-in-form.schema';

import { CenteredBox } from 'components/centered-box.comp';
import PasswordField from 'components/input/password-field.comp';
import TextField from 'components/input/text-field.comp';

type SignInFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<SignInFormFields, any>;
  validationErrors: FieldErrors<SignInFormFields>;
  isLoading: boolean;
};

const StyledButton = styled(Button)(() => ({}));

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
});

export default function SignInForm({ onSubmit, control, validationErrors, isLoading }: SignInFormProps) {
  return (
    <CenteredBox>
      <StyledForm noValidate onSubmit={onSubmit}>
        <TextField
          name="Username"
          control={control}
          error={!!validationErrors.username}
          helperText={validationErrors.username?.message}
          autoComplete="username"
        />
        <PasswordField
          name="Password"
          control={control}
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
          autoComplete="current-password"
        />
        <StyledButton type="submit" variant="contained" fullWidth loading={isLoading}>
          Sign In
        </StyledButton>
      </StyledForm>
    </CenteredBox>
  );
}
