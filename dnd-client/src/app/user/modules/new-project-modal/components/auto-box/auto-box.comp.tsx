import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { DrawTwoTone } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import { AutoForm as AutoFormFields, autoFormSchema } from 'app/user/validation-schemas/auto-form.schema';

import AutoForm from './auto.form';

type Props = {};

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  borderRadius: '10px',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
}));

const StyledIcon = styled(DrawTwoTone)(({ theme }) => ({
  fontSize: '64px',
  color: theme.palette.primary.main,
}));

export default function AutoBox({}: Props) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AutoFormFields>({
    resolver: yupResolver(autoFormSchema),
    defaultValues: {
      mapSize: '',
      crossroadChance: '',
      tunnelLength: '',
    },
  });

  const onSubmit = () => {};

  return (
    <StyledBox>
      <StyledIcon />
      <StyledTypography variant="h5"> Let the magic happen</StyledTypography>
      <AutoForm control={control} validationErrors={errors} onSubmit={handleSubmit(onSubmit)} isLoading={false} />
    </StyledBox>
  );
}
