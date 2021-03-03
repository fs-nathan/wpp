import React from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../contants/routes";
const routes = [
  {
    path: "/tasks",
    exact: true,
    component: () => <Redirect to={Routes.OVERVIEW} />
  },
  {
    path: Routes.OVERVIEW,
    exact: true,
    component: React.lazy(() => import("../views/Overview"))
  },
  {
    path: Routes.DUE,
    exact: true,
    component: React.lazy(() => import("../views/Due"))
  },
  {
    path: Routes.EXPIRED,
    exact: true,
    component: React.lazy(() => import("../views/Expired"))
  },
  {
    path: Routes.MISSION,
    exact: true,
    component: React.lazy(() => import("../views/Assign"))
  },
  {
    path: Routes.ROLE,
    exact: true,
    component: React.lazy(() => import("../views/Role"))
  }
];

export default routes;
