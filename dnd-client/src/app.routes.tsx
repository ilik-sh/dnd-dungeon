import Suspend from "components/routing/suspend";
import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const ConfigurationRoutes = React.lazy(() => import("app/configuration"));
const MapRoutes = React.lazy(() => import("app/map"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={"/configuration/*"}
        element={<Suspend element={ConfigurationRoutes} />}
      ></Route>
      <Route path={"/map/*"} element={<Suspend element={MapRoutes} />}></Route>
      <Route path={"/*"} element={<Navigate to={"/configuration"} />}></Route>
    </Routes>
  );
};

export default AppRoutes;
