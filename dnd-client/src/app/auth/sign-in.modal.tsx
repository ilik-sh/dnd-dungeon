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
import SignInForm from "./components/forms/sign-in-form.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { modalsSelector } from "store/modals.selector";
import { closeModal, openModal } from "store/modals.slice";
import { useForm } from "react-hook-form";
import {
  SignInForm as SignInFormFields,
  signInFormSchema,
} from "./validation-schemas/sign-in-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import IconTitle from "components/icon-title.comp";
import { DungeonDoor } from "assets/icons/dungeon-door.icon";
import CustomLink from "components/custom-link.comp";
import { CloseOutlined } from "@mui/icons-material";

type Props = {};

const StyledDialog = styled(Dialog)(({ theme }) => ({}));

const StyldeDialogContent = styled(DialogContent)({
  padding: "50px",
});

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function SignInModal({}: Props) {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(modalsSelector);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    dispatch(closeModal("signIn"));
  };

  const handleSignUpLinkClicked = () => {
    dispatch(closeModal("signIn"));
    dispatch(openModal("signUp"));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: yupResolver(signInFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log("onSubmit");
    handleClose();
  };

  return (
    <StyledDialog
      open={open.signIn}
      onClose={handleClose}
      fullScreen={fullScreen}
    >
      <IconButton sx={{ position: "absolute" }} onClick={handleClose}>
        <CloseOutlined />
      </IconButton>
      <StyldeDialogContent>
        <StyledContainer>
          <IconTitle title="Sign In" Icon={DungeonDoor} />
          <SignInForm
            control={control}
            validationErrors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Divider />
          <CustomLink
            onClick={handleSignUpLinkClicked}
            text="Don't have an account yet?"
            clickableText="Sign up."
          />
        </StyledContainer>
      </StyldeDialogContent>
    </StyledDialog>
  );
}
