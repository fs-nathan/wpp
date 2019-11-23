import React from "react";
import HomePage from '../views/HomePage';
import ProjectGroupPage from '../views/ProjectGroupPage';
import DepartmentPage from '../views/DepartmentPage';
import MemberPage from '../views/MemberPage';
import ReportPage from '../views/ReportPage';
import DocumentPage from '../views/DocumentPage';
import JobPage from '../views/JobPage';
import JobDetailPage from '../views/JobDetailPage';

import TestPage from '../__test__';
import * as routePath from '../constants/routes'

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <HomePage />,
  },
  {
    path: "/projects",
    component: () => <ProjectGroupPage />,
  },
  {
    path: "/departments",
    component: () => <DepartmentPage />,
  },
  {
    path: "/members",
    component: () => <MemberPage />,
  },
  {
    path: routePath.report,
    component: () => <ReportPage />,
  },
  {
    path: routePath.document,
    component: () => <DocumentPage />,
  },
  {
    path: "/tasks",
    component: () => <JobPage />,
  },
  {
    path: routePath.jobDetail,
    component: () => <JobDetailPage />,
  },
  {
    path: routePath.test,
    component: () => <TestPage />,
  },
  {
    path: "",
    exact: false,
    component: () => null,
  }
];

export default routes;
