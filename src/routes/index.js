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
    path: "/bao-cao",
    component: () => <ReportPage />,
  },
  {
    path: "/tai-lieu",
    component: () => <DocumentPage />,
  },
  {
    path: "/tasks",
    component: () => <JobPage />,
  },
  {
    path: "/chi-tiet-cong-viec",
    component: () => <JobDetailPage />,
  },
  {
    path: "/__test__",
    component: () => <TestPage />,
  },
  {
    path: "",
    exact: false,
    component: () => null,
  }
];

export default routes;
