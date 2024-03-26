import {
  Container,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { modalsSelector } from "store/modals.selector";
import { closeModal, openModal } from "store/modals.slice";
import SignUpForm from "./components/forms/sign-up-form.comp";
import { useForm } from "react-hook-form";
import {
  SignUpForm as SignUpFormFields,
  signUpFormSchema,
} from "./validation-schemas/sign-up-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseOutlined } from "@mui/icons-material";
import { DungeonDoor } from "assets/icons/dungeon-door.icon";
import IconTitle from "components/icon-title.comp";
import CustomLink from "components/custom-link.comp";

type Props = {};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDialogContent = styled(DialogContent)({
  padding: "50px",
});

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "100%",
});

export default function SignUpModal({}: Props) {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(modalsSelector);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: yupResolver(signUpFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleClose = () => {
    dispatch(closeModal("signUp"));
  };

  const handleSignInLinkClicked = () => {
    dispatch(closeModal("signUp"));
    dispatch(openModal("signIn"));
  };

  const onSubmit = () => {
    console.log("Sign up submit");
    handleClose();
  };

  return (
    <StyledDialog
      open={open.signUp}
      onClose={handleClose}
      fullScreen={fullScreen}
    >
      <IconButton sx={{ position: "absolute" }} onClick={handleClose}>
        <CloseOutlined />
      </IconButton>
      <StyledDialogContent>
        <StyledContainer>
          <IconTitle title="Sign In" Icon={DungeonDoor} />
          <SignUpForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            validationErrors={errors}
          />
          <Divider />
          <CustomLink
            onClick={handleSignInLinkClicked}
            text="Already have an account?"
            clickableText="Sign in."
          />
        </StyledContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
}