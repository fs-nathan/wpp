import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../constants/routes";
const routes = [
  {
    path: Routes.PARENT,
    exact: true,
    component: () => <Redirect to={Routes.WEEKLY} />
  },
  {
    path: Routes.WEEKLY,
    exact: true,
    component: React.lazy(() => import("../views/Weekly"))
  },
  {
    path: Routes.PROJECT,
    exact: true,
    component: React.lazy(() => import("../views/Project"))
  }
];

export default routes;
