import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { CloseOutlined } from '@mui/icons-material';
import { Container, Dialog, DialogContent, Divider, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { router } from 'App';
import { enqueueSnackbar } from 'notistack';

import { ModalContext } from 'widgets/modals-provider';

import { DungeonDoor } from 'shared/assets/icons/dungeon-door.icon';
import { Modals } from 'shared/libs/constants/modals';
import { processReject } from 'shared/libs/utils/proccess-reject';
import CustomLink from 'shared/ui/custom-link.comp';
import IconTitle from 'shared/ui/icon-title.comp';

import { useSignInMutation } from '../api/sign-in.mutation';
import { SignInForm as SignInFormFields, signInFormSchema } from '../model/validation-schemas/sign-in-form.schema';
import SignInForm from './sign-in-form.comp';

const StyledDialog = styled(Dialog)(() => ({}));

const StyldeDialogContent = styled(DialogContent)({
  padding: '50px',
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export default function SignInModal() {
  const { openModal, closeModal } = useContext(ModalContext);
  const theme = useTheme();
  const [signIn, { isLoading }] = useSignInMutation();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    closeModal();
  };

  const handleSignUpLinkClicked = () => {
    openModal(Modals.SignUpModal);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: yupResolver(signInFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormFields) => {
    signIn(data)
      .unwrap()
      .then((result) => {
        enqueueSnackbar('Successfully signed in', { variant: 'success' });
        handleClose();
        router.navigate('/home');
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
      <StyldeDialogContent>
        <StyledContainer>
          <IconTitle title="Sign In" Icon={DungeonDoor} />
          <SignInForm
            control={control}
            validationErrors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
          <Divider />
          <CustomLink onClick={handleSignUpLinkClicked} text="Don't have an account yet?" clickableText="Sign up." />
        </StyledContainer>
      </StyldeDialogContent>
    </StyledDialog>
  );
}
