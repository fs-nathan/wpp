import React from "react";
import HomePage from '../views/HomePage';
import ProjectPage from '../views/ProjectPage';
import UserPage from '../views/UserPage';
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
    path: routePath.project,
    component: () => <ProjectPage />,
  },
  {
    path: routePath.member,
    component: () => <UserPage />,
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
    path: routePath.task,
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
