import React from "react";
import Playground from "views/Playground";
import { Routes } from "../constants/routes";
import ConfirmRegistration from "../views/AccountPage/ConfirmRegistration";
import ForgotPassword from "../views/AccountPage/ForgotPassword";
import LoginPage from "../views/AccountPage/LoginPage";
import RegisterPage from "../views/AccountPage/RegisterPage";
import ResetPassword from "../views/AccountPage/ResetPassword";
import DepartmentPage from "../views/DepartmentPage";
import DocumentPage from "../views/DocumentPage";
import HomePage from "../views/HomePage";
import JobDetailPage from "../views/JobDetailPage";
import JobPage from "../views/JobPage";
import MemberPage from "../views/MemberPage";
import MessageNoticePage from "../views/MessageNoticePage";
import ProjectGroupPage from "../views/ProjectGroupPage";
import ProjectPage from "../views/ProjectPage";
import ReportPage from "../views/ReportPage";
import SettingAccountPage from "../views/SettingAccountPage";
import SettingGroupPage from "../views/SettingGroupPage";
import TestPage from "../__test__";

const routes = [
  { path: Routes.HOME, exact: true, component: () => <HomePage /> },
  { path: Routes.PROJECTS, component: () => <ProjectGroupPage /> },
  { path: Routes.PROJECT, component: () => <ProjectPage /> },
  { path: Routes.DEPARTMENTS, component: () => <DepartmentPage /> },
  { path: Routes.MEMBERS, component: () => <MemberPage /> },
  { path: Routes.REPORT, component: () => <ReportPage /> },
  { path: Routes.DOCUMENT, component: () => <DocumentPage /> },
  { path: Routes.TASKS, component: () => <JobPage /> },
  {
    path: Routes.JOB_DETAIL,
    component: (props) => <JobDetailPage {...props} />,
  },
  { path: Routes.TEST, component: () => <TestPage /> },
  { path: Routes.SETTING_ACCOUNT, component: () => <SettingAccountPage /> },
  { path: Routes.SETTING_GROUP, component: () => <SettingGroupPage /> },
  { path: Routes.LOGIN, component: () => <LoginPage /> },
  { path: Routes.REGISTER, component: () => <RegisterPage /> },
  { path: Routes.FORGOT_PASSWORD, component: () => <ForgotPassword /> },
  { path: Routes.RESET_PASSWORD, component: () => <ResetPassword /> },
  {
    path: Routes.CONFIRM_REGISTRATION,
    component: () => <ConfirmRegistration />,
  },
  { path: Routes.MESSAGE_NOTICE, component: () => <MessageNoticePage /> },
  ...(process.env.NODE_ENV !== "production"
    ? [{ path: "/playground", component: () => <Playground /> }]
    : []),
  { path: "", exact: false, component: () => null },
];

export default routes;
