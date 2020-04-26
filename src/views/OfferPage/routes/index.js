import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../contants/routes";
const routes = [
  {
    path: Routes.OVERVIEW,
    exact: true,
    component: React.lazy(() => import("../views/Overview"))
  },
];

export default routes;
