import Suspend from 'components/routing/suspend';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ConfigurationRoutes = React.lazy(() => import('app/configuration'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/configuration/*'} element={<Suspend element={ConfigurationRoutes} />}></Route>
      <Route path={'/*'} element={<Navigate to={'/configuration'} />}></Route>
    </Routes>
  );
};

export default AppRoutes;
