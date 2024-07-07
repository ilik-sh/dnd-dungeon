import { ReactNode } from 'react';

import { router } from 'App';

import { useAuth } from 'hooks/use-auth.hook';

type Props = {
  children: any;
  redirectTo?: string;
};

export default function ProtectedRoute({ children, redirectTo }: Props) {
  const isAuth = useAuth();
  const redirectRoute = redirectTo ? redirectTo : '/404';

  if (!isAuth) {
    return router.navigate(redirectRoute);
  }

  return children;
}
