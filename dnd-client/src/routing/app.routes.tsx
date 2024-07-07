import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Suspend from 'routing/suspend';

import ProtectedRoute from './protected-route.comp';

const ConfigurationRoutes = React.lazy(() => import('app/configuration'));
const HomeRoutes = React.lazy(() => import('app/user'));
const NotFoundPage = React.lazy(() => import('pages/not-found.page'));
const LandingPage = React.lazy(() => import('app/landing/landing.page'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={'/home/*'}
        element={
          <ProtectedRoute>
            <Suspend element={HomeRoutes} />
          </ProtectedRoute>
        }
      ></Route>
      <Route path={'/configuration/*'} element={<Suspend element={ConfigurationRoutes} />}></Route>
      <Route path={'/'} element={<Suspend element={LandingPage} />} />
      <Route path={'/*'} element={<Suspend element={NotFoundPage} />}></Route>
    </Routes>
  );
};

export default AppRoutes;
