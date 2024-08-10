import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { LoadingButton as Button } from '@mui/lab';
import { styled } from '@mui/material';
import { CenteredBox } from 'shared/ui/centered-box.comp';
import PasswordField from 'shared/ui/password-field.comp';
import TextField from 'shared/ui/text-field.comp';

import { SignUpForm as SignUpFormFields } from '../model/validation-schemas/sign-up-form.schema';

type SignUpFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<SignUpFormFields, any>;
  validationErrors: FieldErrors<SignUpFormFields>;
  isLoading: boolean;
};

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
});

export default function SignUpForm({ onSubmit, control, validationErrors, isLoading }: SignUpFormProps) {
  return (
    <CenteredBox>
      <StyledForm noValidate onSubmit={onSubmit}>
        <TextField
          control={control}
          name="Email"
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
          autoComplete="new-email"
        />
        <TextField
          control={control}
          name="Username"
          error={!!validationErrors.username}
          helperText={validationErrors.username?.message}
          autoComplete="nickname"
        />
        <PasswordField
          control={control}
          name="Password"
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
          autoComplete="new-password"
        />
        <PasswordField
          control={control}
          name="Confirm password"
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword?.message}
          autoComplete="new-password"
        />
        <Button type="submit" variant="contained" loading={isLoading} fullWidth>
          Sign Up
        </Button>
      </StyledForm>
    </CenteredBox>
  );
}
