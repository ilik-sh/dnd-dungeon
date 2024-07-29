import { createContext } from 'react';

import { HomeTabContextType } from './types/home-tab-context.type';

export const HomeTabContext = createContext<HomeTabContextType>({
  setTab: (tab: string) => {},
});
