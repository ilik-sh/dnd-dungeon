import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from 'shared/ui/protected-route.comp';
import Suspend from 'shared/ui/suspend';

const HomePage = React.lazy(() => import('pages/home'));
const LandingPage = React.lazy(() => import('pages/landing'));
const NotFoundPage = React.lazy(() => import('pages/not-found'));
const MapEditorPage = React.lazy(() => import('pages/map-editor'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Suspend element={LandingPage} />} />
      <Route path={'/*'} element={<Suspend element={NotFoundPage} />} />
      <Route
        path={'/map/:id'}
        element={
          <ProtectedRoute>
            <Suspend element={MapEditorPage} />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/home'}
        element={
          <ProtectedRoute>
            <Suspend element={HomePage} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
