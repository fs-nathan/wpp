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
    path: Routes.MISSION,
    exact: true,
    component: React.lazy(() => import("../views/Mission"))
  },
  {
    path: Routes.MISSION_GIVING,
    component: React.lazy(() => import("../views/Due"))
  },
  {
    path: Routes.MISSION_GIVEN,
    component: React.lazy(() => import("../views/Due"))
  },
  {
    path: Routes.MISSION_SELFGIVING,
    exact: true,
    component: React.lazy(() => import("../views/Due"))
  },
  {
    path: Routes.ROLE,
    exact: true,
    component: React.lazy(() => import("../views/Due"))
  },
  {
    path: Routes.ROLE_RUNNING,
    component: React.lazy(() => import("../views/Due"))
  },
  {
    path: Routes.ROLE_COORDINATION,
    component: React.lazy(() => import("../views/Due"))
  }
];

export default routes;
