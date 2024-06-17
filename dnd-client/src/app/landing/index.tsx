import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Suspend from 'components/routing/suspend';

const LandingPage = React.lazy(() => import('app/landing/landing.page'));

const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path={''} element={<Suspend element={LandingPage} />}></Route>
    </Routes>
  );
};

export default ConfigurationRoutes;
