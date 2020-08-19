import React from "react";
import { Routes } from "../contants/routes";
const routes = [
  {
    path: Routes.OVERVIEW,
    exact: true,
    component: React.lazy(() => import("../views/Overview"))
  },
  {
    path: Routes.RECENTLY,
    exact: true,
    component: React.lazy(() => import("../views/Recently"))
  },
  {
    path: Routes.OFFERBYGROUP + "/:id?",
    exact: true,
    component: React.lazy(() => import("../views/OfferByGroup"))
  },
  {
    path: Routes.OFFERBYPROJECT + "/:id?",
    exact: true,
    component: React.lazy(() => import("../views/OfferByProject"))
  },
  {
    path: Routes.OFFERBYDEPARTMENT + "/:id?",
    exact: true,
    component: React.lazy(() => import("../views/OfferByDepartment"))
  }
];

export default routes;
