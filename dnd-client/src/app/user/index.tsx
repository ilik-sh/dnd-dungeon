import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Suspend from 'routing/suspend';

const HomePage = React.lazy(() => import('app/user/pages/home.page'));

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path={'*'} element={<Suspend element={HomePage} />}></Route>
    </Routes>
  );
};

export default HomeRoutes;
