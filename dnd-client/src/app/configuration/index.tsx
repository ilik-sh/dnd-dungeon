import { Routes, Route } from "react-router-dom";
import React from "react";
import Suspend from "components/routing/suspend";

const ConfigurationPage = React.lazy(
  () => import("app/configuration/configuration.page")
);

const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route
        path={""}
        element={<Suspend element={ConfigurationPage} />}
      ></Route>
    </Routes>
  );
};

export default ConfigurationRoutes;
