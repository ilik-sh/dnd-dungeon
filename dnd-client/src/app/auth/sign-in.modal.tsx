import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { CloseOutlined } from '@mui/icons-material';
import { Container, Dialog, DialogContent, Divider, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { router } from 'App';
import { DungeonDoor } from 'assets/icons/dungeon-door.icon';
import { enqueueSnackbar } from 'notistack';
import { modalsSelector } from 'store/modals.selector';
import { closeModal, openModal } from 'store/modals.slice';

import SignInForm from './components/forms/sign-in-form.comp';
import CustomLink from 'components/custom-link.comp';
import IconTitle from 'components/icon-title.comp';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';

import { ApiError } from '../../types/api.error';
import { useSignInMutation } from './store/auth.api';
import { SignInForm as SignInFormFields, signInFormSchema } from './validation-schemas/sign-in-form.schema';

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
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(modalsSelector);
  const theme = useTheme();
  const [signIn, { isSuccess, isError, isLoading, error }] = useSignInMutation();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Successfully signed in', { variant: 'success' });
      handleClose();
      router.navigate('/home');
    }
    if (isError) {
      if (!error.data) {
        enqueueSnackbar('Unknown error', { variant: 'error' });
        return;
      }
      if (Array.isArray((error as any).data.errors)) {
        (error as any).data.errors.map((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
      }
    }
  }, [isLoading]);

  const handleClose = () => {
    dispatch(closeModal('signIn'));
  };

  const handleSignUpLinkClicked = () => {
    dispatch(closeModal('signIn'));
    dispatch(openModal('signUp'));
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
    signIn(data);
  };

  return (
    <StyledDialog open={open.signIn} onClose={handleClose} fullScreen={fullScreen} disableScrollLock>
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
