import { Routes, Route } from 'react-router-dom';
import React from 'react';
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
