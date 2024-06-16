import { Button, styled } from '@mui/material';

import { RoomFormYup } from 'app/configuration/validation-schemas/room-form.schema';
import Select from 'components/input/select.comp';
import TextField from 'components/input/text-field.comp';
import { RoomType } from 'enums/room-type.enum';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import HexDirections from './room-directions.comp';

type RoomFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<RoomFormYup, any>;
  validationErorrs: FieldErrors<RoomFormYup>;
};

const roomLevels = [1, 2, 3, 4, 5];

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  paddingTop: '10px',
});

const SelectPart = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

const CustomTextField = styled(TextField)({});
const CustomSelect = styled(Select)({
  height: 'var(--input-height)',
});

export default function RoomForm({ onSubmit, control, validationErorrs }: RoomFormProps) {
  return (
    <StyledForm noValidate>
      <SelectPart>
        <CustomSelect
          submit={onSubmit}
          control={control}
          name="Level"
          selectValues={roomLevels}
          error={!!validationErorrs.level}
        />
        <CustomSelect
          submit={onSubmit}
          control={control}
          name="Type"
          selectValues={Object.values(RoomType)}
          error={!!validationErorrs.type}
        />
        <CustomTextField
          submit={onSubmit}
          control={control}
          name="Description"
          error={!!validationErorrs.description}
          helperText={validationErorrs.description?.message}
        />
        <HexDirections control={control} submit={onSubmit}></HexDirections>
      </SelectPart>
    </StyledForm>
  );
}
