import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { CloseOutlined } from '@mui/icons-material';
import { Container, Dialog, DialogContent, Divider, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { ModalContext } from 'widgets/modals-provider';

import { DungeonDoor } from 'shared/assets/icons/dungeon-door.icon';
import { Modals } from 'shared/libs/constants/modals';
import { processReject } from 'shared/libs/utils/proccess-reject';
import CustomLink from 'shared/ui/custom-link.comp';
import IconTitle from 'shared/ui/icon-title.comp';

import { useSignUpMutation } from '../api/sign-up.mutation';
import { SignUpForm as SignUpFormFields, signUpFormSchema } from '../model/validation-schemas/sign-up-form.schema';
import SignUpForm from './sign-up-form.comp';

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
  const { closeModal, openModal } = useContext(ModalContext);
  const [signUp, { isLoading }] = useSignUpMutation();

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
    closeModal();
  };

  const handleSignInLinkClicked = () => {
    closeModal();
    openModal(Modals.SignInModal);
  };

  const onSubmit = async (data: SignUpFormFields) => {
    signUp(data)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Succesfully signed up', { variant: 'success' });
        handleClose();
      })
      .catch((reject) => {
        processReject(reject);
      });
  };

  return (
    <StyledDialog open onClose={handleClose} fullScreen={fullScreen} disableScrollLock>
      <IconButton sx={{ position: 'absolute' }} onClick={handleClose}>
        <CloseOutlined />
      </IconButton>
      <StyledDialogContent>
        <StyledContainer>
          <IconTitle title="Sign In" Icon={DungeonDoor} />
          <SignUpForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            validationErrors={errors}
            isLoading={isLoading}
          />
          <Divider />
          <CustomLink onClick={handleSignInLinkClicked} text="Already have an account?" clickableText="Sign in." />
        </StyledContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
}