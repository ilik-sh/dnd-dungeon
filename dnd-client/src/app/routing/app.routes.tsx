import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import { ServerErrorPage } from 'pages/server-error';

import ProtectedRoute from 'shared/ui/protected-route.comp';
import Suspend from 'shared/ui/suspend';

const HomePage = React.lazy(() => import('pages/home'));
const LandingPage = React.lazy(() => import('pages/landing'));
const NotFoundPage = React.lazy(() => import('pages/not-found'));
const MapEditorPage = React.lazy(() => import('pages/map-editor'));
const TestPage = React.lazy(() => import('pages/test'));

function fallbackRender({ error, resetErrorBoundary }) {
  return <ServerErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />;
}

export const AppRoutes = () => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={(details) => {}}>
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
        <Route path="/test" element={<Suspend element={TestPage} />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
