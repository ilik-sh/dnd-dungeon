import Suspend from 'components/routing/suspend';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ConfigurationRoutes = React.lazy(() => import('app/configuration'));
const LandingRoutes = React.lazy(() => import('app/landing'));
const NotFoundPage = React.lazy(() => import('pages/not-found.page'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/configuration/*'} element={<Suspend element={ConfigurationRoutes} />}></Route>
      <Route path={'/'} element={<Suspend element={LandingRoutes} />} />
      <Route path={'/*'} element={<Suspend element={NotFoundPage} />}></Route>
    </Routes>
  );
};

export default AppRoutes;
