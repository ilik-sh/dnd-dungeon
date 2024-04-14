import { Button, styled } from '@mui/material';
import { SignInForm as SignInFormFields } from 'app/auth/validation-schemas/sign-in-form.schema';
import { CenteredBox } from 'components/centered-box.comp';
import PasswordField from 'components/password-field.comp';
import TextField from 'components/text-field.comp';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

type SignInFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<SignInFormFields, any>;
  validationErrors: FieldErrors<SignInFormFields>;
};

const StyledButton = styled(Button)(() => ({}));

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
});

export default function SignInForm({ onSubmit, control, validationErrors }: SignInFormProps) {
  return (
    <CenteredBox>
      <StyledForm noValidate onSubmit={onSubmit}>
        <TextField
          name="Email"
          control={control}
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
          autoComplete="email"
        />
        <PasswordField
          name="Password"
          control={control}
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
          autoComplete="current-password"
        />
        <StyledButton type="submit" variant="contained" fullWidth>
          Sign In
        </StyledButton>
      </StyledForm>
    </CenteredBox>
  );
}
