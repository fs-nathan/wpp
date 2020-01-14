import React from 'react';
import HomePage from '../views/HomePage';
import ProjectGroupPage from '../views/ProjectGroupPage';
import ProjectPage from '../views/ProjectPage';
import DepartmentPage from '../views/DepartmentPage';
import MemberPage from '../views/MemberPage';
import ReportPage from '../views/ReportPage';
import DocumentPage from '../views/DocumentPage';
import JobPage from '../views/JobPage';
import JobDetailPage from '../views/JobDetailPage';
import SettingAccountPage from '../views/SettingAccountPage';
import SettingGroupPage from '../views/SettingGroupPage';
import LoginPage from '../views/AccountPage/LoginPage';
import RegisterPage from '../views/AccountPage/RegisterPage';
import ForgotPassword from '../views/AccountPage/ForgotPassword';
import ResetPassword from '../views/AccountPage/ResetPassword';
import ConfirmRegistration from '../views/AccountPage/ConfirmRegistration';
import MessageNoticePage from '../views/MessageNoticePage';

import TestPage from '../__test__';
import { Routes } from '../constants/routes';

const routes = [
  { path: Routes.HOME, exact: true, component: () => <HomePage /> },
  { path: Routes.PROJECTS, component: () => <ProjectGroupPage /> },
  { path: Routes.PROJECT, component: () => <ProjectPage /> },
  { path: Routes.DEPARTMENTS, component: () => <DepartmentPage /> },
  { path: Routes.MEMBERS, component: () => <MemberPage /> },
  { path: Routes.REPORT, component: () => <ReportPage /> },
  { path: Routes.DOCUMENT, component: () => <DocumentPage /> },
  { path: Routes.TASKS, component: () => <JobPage /> },
  { path: Routes.JOB_DETAIL, component: (props) => <JobDetailPage {...props}/> },
  { path: Routes.TEST, component: () => <TestPage /> },
  { path: Routes.SETTING_ACCOUNT, component: () => <SettingAccountPage /> },
  { path: Routes.SETTING_GROUP, component: () => <SettingGroupPage /> },
  { path: Routes.LOGIN, component: () => <LoginPage /> },
  { path: Routes.REGISTER, component: () => <RegisterPage /> },
  { path: Routes.FORGOT_PASSWORD, component: () => <ForgotPassword /> },
  { path: Routes.RESET_PASSWORD, component: () => <ResetPassword /> },
  {
    path: Routes.CONFIRM_REGISTRATION,
    component: () => <ConfirmRegistration />
  },
  { path: Routes.MESSAGE_NOTICE, component: () => <MessageNoticePage /> },
  { path: '', exact: false, component: () => null }
];

export default routes;
