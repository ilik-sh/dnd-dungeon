import { LocalStorageKeys } from 'shared/libs/enums/local-storage-keys.enum';

import { useAppSelector } from './redux.hooks';

export const useAuth = () => {
  const accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);
  return Boolean(accessToken);
};
