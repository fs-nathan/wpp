import React from "react";
import { Routes } from "../constants/routes";
const routes = [
  {
    path: Routes.ALARM_RECENTLY,
    exact: true,
    component: React.lazy(() => import("../RightPart/RecentlyAlarm"))
  },
  {
    path: Routes.ALARM_PROJECT,
    exact: true,
    component: React.lazy(() => import("../RightPart/ProjectAlarm"))
  },
  {
    path: Routes.ALARM_PERSONAL,
    exact: true,
    component: React.lazy(() => import("../RightPart/PersonalAlarm"))
  }
];

export default routes;
