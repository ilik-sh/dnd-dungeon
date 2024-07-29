import React, { useState } from 'react';

import { TabContext } from '@mui/lab';

import { HomeTabContext } from '../model/home-tab.context';

type HomeTabProviderProps = {
  children: any;
};

export default function HomeTabProvider({ children }: HomeTabProviderProps) {
  const [tab, setTab] = useState<string>('maps');

  return (
    <HomeTabContext.Provider value={{ setTab }}>
      <TabContext value={tab}>{children}</TabContext>
    </HomeTabContext.Provider>
  );
}
