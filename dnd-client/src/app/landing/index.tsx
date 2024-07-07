import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Suspend from 'routing/suspend';

const LandingPage = React.lazy(() => import('app/landing/landing.page'));

const LandingRoutes = () => {
  return (
    <Routes>
      <Route path={''} element={<Suspend element={LandingPage} />}></Route>
    </Routes>
  );
};

export default LandingRoutes;
