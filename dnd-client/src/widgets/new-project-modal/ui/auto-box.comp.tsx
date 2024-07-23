import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { DrawTwoTone } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import { router } from 'App';
import { processReject } from 'shared/libs/utils/proccess-reject';
import {
  AutoForm as AutoFormFields,
  autoFormSchema,
} from 'widgets/new-project-modal/model/validation-schemas/auto-form.schema';

import { useCreateProjectMutation } from '../api/create-project.mutation';
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
  const [createProject, { isLoading }] = useCreateProjectMutation();

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

  const onSubmit = async (data: AutoFormFields) => {
    createProject(data)
      .unwrap()
      .then((response) => {
        console.log(response.data);
        router.navigate(`/map/${response.mapId}`);
      })
      .catch((reject) => {
        processReject(reject);
      });
  };

  return (
    <StyledBox>
      <StyledIcon />
      <StyledTypography variant="h5"> Let the magic happen</StyledTypography>
      <AutoForm control={control} validationErrors={errors} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
    </StyledBox>
  );
}
