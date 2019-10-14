import React from "react";
import HomePage from '../views/HomePage';
import ProjectPage from '../views/ProjectPage';
import UserPage from '../views/UserPage';
import ReportPage from '../views/ReportPage';
import DocumentPage from '../views/DocumentPage';
import JobPage from '../views/JobPage';
import JobDetailPage from '../views/JobDetailPage';

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <HomePage />,
  },
  {
    path: "/du-an",
    component: () => <ProjectPage />,
  },
  {
    path: "/thanh-vien",

    component: () => <UserPage />,
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
    path: "/cong-viec",
    component: () => <JobPage />,
  },
  {
    path: "/chi-tiet-cong-viec",
    component: () => <JobDetailPage />,
  },
  {
    path: "",
    exact: false,
    component: () => null,
  }
];

export default routes;
