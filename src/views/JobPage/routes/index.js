import React from "react";
import { Routes } from "../contants/routes";
import Layout from "../Layout";
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import Overview from "../views/Overview";
import Mission from "../views/Mission";

const routes = [
  {
    path: Routes.OVERVIEW,
    exact: true,
    component: React.lazy(() => import("../views/Overview"))
  },
  { path: Routes.DUE, exact: true, component: () => <div>DUE</div> },
  {
    path: Routes.MISSION,
    exact: true,
    component: React.lazy(() => import("../views/Mission"))
  },
  { path: Routes.MISSION_GIVING, component: () => <div>MISSION_GIVING</div> },
  { path: Routes.MISSION_GIVEN, component: () => <div>MISSION_GIVEN</div> },
  {
    path: Routes.MISSION_SELFGIVING,
    exact: true,
    component: () => <div>MISSION_SELFGIVING</div>
  },
  { path: Routes.ROLE, exact: true, component: () => <div>ROLE</div> },
  { path: Routes.ROLE_RUNNING, component: () => <div>ROLE_RUNNING</div> },
  {
    path: Routes.ROLE_COORDINATION,
    component: () => <div>ROLE_COORDINATION</div>
  }
];

export default routes;
