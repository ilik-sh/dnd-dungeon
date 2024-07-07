import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Suspend from 'routing/suspend';

const ConfigurationPage = React.lazy(() => import('app/configuration/configuration.page'));

const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path={''} element={<Suspend element={ConfigurationPage} />}></Route>
    </Routes>
  );
};

export default ConfigurationRoutes;
