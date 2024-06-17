import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { CloseOutlined } from '@mui/icons-material';
import { Container, Dialog, DialogContent, Divider, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { DungeonDoor } from 'assets/icons/dungeon-door.icon';
import { enqueueSnackbar } from 'notistack';
import { modalsSelector } from 'store/modals.selector';
import { closeModal, openModal } from 'store/modals.slice';

import SignUpForm from './components/forms/sign-up-form.comp';
import CustomLink from 'components/custom-link.comp';
import IconTitle from 'components/icon-title.comp';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';

import { signUp } from './store/auth.actions';
import { ApiError } from './types/api.error';
import { SignUpForm as SignUpFormFields, signUpFormSchema } from './validation-schemas/sign-up-form.schema';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDialogContent = styled(DialogContent)({
  padding: '50px',
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '100%',
});

export default function SignUpModal() {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(modalsSelector);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: yupResolver(signUpFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleClose = () => {
    dispatch(closeModal('signUp'));
  };

  const handleSignInLinkClicked = () => {
    dispatch(closeModal('signUp'));
    dispatch(openModal('signIn'));
  };

  const onSubmit = async (data: SignUpFormFields) => {
    const response = await dispatch(signUp(data));
    if (response.meta.requestStatus === 'fulfilled') {
      enqueueSnackbar('Succesfully signed up', { variant: 'success' });
      handleClose();
    }
    if (response.meta.requestStatus === 'rejected') {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: 'error' });
    }
  };

  return (
    <StyledDialog open={open.signUp} onClose={handleClose} fullScreen={fullScreen} disableScrollLock>
      <IconButton sx={{ position: 'absolute' }} onClick={handleClose}>
        <CloseOutlined />
      </IconButton>
      <StyledDialogContent>
        <StyledContainer>
          <IconTitle title="Sign In" Icon={DungeonDoor} />
          <SignUpForm control={control} onSubmit={handleSubmit(onSubmit)} validationErrors={errors} />
          <Divider />
          <CustomLink onClick={handleSignInLinkClicked} text="Already have an account?" clickableText="Sign in." />
        </StyledContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
}
