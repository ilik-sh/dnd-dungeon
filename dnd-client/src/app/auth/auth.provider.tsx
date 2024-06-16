import React from 'react';
import SignUpModal from './sign-up.modal';
import SignInModal from './sign-in.modal';
import { useAppSelector } from 'hooks/redux.hooks';
import { modalsSelector } from 'store/modals.selector';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { open } = useAppSelector(modalsSelector);
  return (
    <>
      {open.signUp ? <SignUpModal /> : null}
      {open.signIn ? <SignInModal /> : null}
      {children}
    </>
  );
}
