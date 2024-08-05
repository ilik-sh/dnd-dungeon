import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { ImportModelFormYup } from '../model/validation-shemas/import-modal-form.schema';

type ImportModelFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<ImportModelFormYup, any>;
  validationErrors: FieldErrors<ImportModelFormYup>;
  isLoading: boolean;
};

export default function ImportModelForm({ onSubmit, control, validationErrors, isLoading }: ImportModelFormProps) {
  return (
    <>
      <DropBox
        id={id}
        onDrop={(e) => {
          e.preventDefault();
          console.log('change');
        }}
      >
        <TextBox>
          <Typography variant="body1" fontWeight={600}>
            Bring your dungeon here
          </Typography>
          <Typography variant="body2">Import JSON file that contains map information</Typography>
        </TextBox>

        <StyledButton variant="contained" fullWidth>
          <label htmlFor={uploadId}>
            Choose file from computer
            <StyledInput type="file" id={uploadId}></StyledInput>
          </label>
        </StyledButton>
      </DropBox>
      <DropBox
        id={id}
        onDrop={(e) => {
          e.preventDefault();
          console.log('change');
        }}
      >
        <TextBox>
          <Typography variant="body1" fontWeight={600}>
            Bring your dungeon here
          </Typography>
          <Typography variant="body2">Import JSON file that contains map information</Typography>
        </TextBox>

        <StyledButton variant="contained" fullWidth>
          <label htmlFor={uploadId}>
            Choose file from computer
            <StyledInput type="file" id={uploadId}></StyledInput>
          </label>
        </StyledButton>
      </DropBox>
    </>
  );
}
