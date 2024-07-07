import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { CasinoTwoTone, Help } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Box, styled, Tooltip } from '@mui/material';
import { AutoForm as AutoFormFields } from 'app/user/validation-schemas/auto-form.schema';

import { CenteredBox } from 'components/centered-box.comp';
import TextField from 'components/input/text-field.comp';

type AutoFormProps = {
  onSubmit: React.FormEventHandler;
  control: Control<AutoFormFields, any>;
  validationErrors: FieldErrors<AutoFormFields>;
  isLoading: boolean;
};

const StyledButton = styled(Button)(() => ({}));

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
});

const TooltipBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
}));

const tooltipText = {
  mapSize: 'This is a size of generated map X by X',
  tunnelLength: 'Average length of tunnels in generated dungeons',
  crossroadChance: 'Chance of separate tunnel dividing into new ones',
};

export default function AutoForm({ onSubmit, control, validationErrors, isLoading }: AutoFormProps) {
  return (
    <CenteredBox sx={{ width: '100%', background: 'transparent', padding: '1rem' }}>
      <StyledForm noValidate onSubmit={onSubmit}>
        <TooltipBox>
          <TextField
            name="Map size"
            type="number"
            control={control}
            error={!!validationErrors.mapSize}
            helperText={validationErrors.mapSize?.message}
            autoComplete=""
          />
          <Tooltip title={tooltipText.mapSize}>
            <Help fontSize="small" />
          </Tooltip>
        </TooltipBox>

        <TooltipBox>
          <TextField
            name="Tunnel length"
            control={control}
            error={!!validationErrors.tunnelLength}
            helperText={validationErrors.tunnelLength?.message}
          />
          <Tooltip title={tooltipText.tunnelLength}>
            <Help fontSize="small" />
          </Tooltip>
        </TooltipBox>

        <TooltipBox>
          <TextField
            name="Crossroad chance"
            control={control}
            error={!!validationErrors.crossroadChance}
            helperText={validationErrors.crossroadChance?.message}
          />
          <Tooltip title={tooltipText.crossroadChance}>
            <Help fontSize="small" />
          </Tooltip>
        </TooltipBox>

        <StyledButton type="submit" variant="contained" fullWidth loading={isLoading} endIcon={<CasinoTwoTone />}>
          Roll on
        </StyledButton>
      </StyledForm>
    </CenteredBox>
  );
}
