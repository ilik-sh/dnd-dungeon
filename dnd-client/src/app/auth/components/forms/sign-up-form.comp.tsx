import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { SignUpForm as SignUpFormFields } from "app/auth/validation-schemas/sign-up-form.schema";
import { CenteredBox } from "components/centered-box.comp";
import TextField from "components/text-field.comp";
import PasswordField from "components/password-field.comp";
import { Button, styled } from "@mui/material";

type SignUpFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<SignUpFormFields, any>;
  validationErrors: FieldErrors<SignUpFormFields>;
};

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
});

export default function SignUpForm({
  onSubmit,
  control,
  validationErrors,
}: SignUpFormProps) {
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
        <Button type="submit" variant="contained" fullWidth>
          Sign Up
        </Button>
      </StyledForm>
    </CenteredBox>
  );
}
