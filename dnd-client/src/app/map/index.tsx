import { Routes, Route } from "react-router-dom";
import React from "react";
import Suspend from "components/routing/suspend";

const MapPage = React.lazy(() => import("app/map/map.page"));

const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspend element={MapPage} />}></Route>
    </Routes>
  );
};

export default ConfigurationRoutes;
