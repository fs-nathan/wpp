import loadable from "@loadable/component";
import ValidateNoLogin from "components/ValidateNoLogin/ValidateNoLogin";
import { Routes } from "constants/routes";
import React from "react";
import { Redirect } from "react-router-dom";
import DocumentPage from "views/DocumentPage";
import { Routes as jobRoutes } from "views/JobPage/contants/routes";
import SettingAccountPage from "views/SettingAccountPage";
import SettingGroupPage from "views/SettingGroupPage";

const CalendarAlarmPage = loadable(() => import("views/CalendarAlarmPage"), {
  fallback: <div />,
});
const CalendarPage = loadable(() => import("views/CalendarPage"), {
  fallback: <div />,
});
const CalendarProjectPage = loadable(
  () => import("views/CalendarProjectPage"), {
  fallback: <div />,
});
const CalendarWeeklyPage = loadable(() => import("views/CalendarWeeklyPage"), {
  fallback: <div />,
});
const Playground = loadable(() => import("views/Playground"), {
  fallback: <div />,
});
const ConfirmRegistration = loadable(
  () => import("views/AccountPage/ConfirmRegistration"), {
  fallback: <div />,
});
const ForgotPassword = loadable(
  () => import("views/AccountPage/ForgotPassword"), {
  fallback: <div />,
});
const LoginPage = loadable(() => import("views/AccountPage/LoginPage"), {
  fallback: <div />,
});
const RegisterPage = loadable(() => import("views/AccountPage/RegisterPage"), {
  fallback: <div />,
});
const ResetPassword = loadable(
  () => import("views/AccountPage/ResetPassword"), {
  fallback: <div />,
});
const DepartmentPage = loadable(() => import("views/DepartmentPage"), {
  fallback: <div />,
});
const KanbanPage = loadable(() => import("views/KanbanPage"), {
  fallback: <div />,
});
const HomePage = loadable(() => import("views/HomePage"), {
  fallback: <div />,
});
const JobDetailPage = loadable(() => import("views/JobDetailPage"), {
  fallback: <div />,
});
const JobPage = loadable(() => import("views/JobPage"), {
  fallback: <div />,
});
const MemberPage = loadable(() => import("views/MemberPage"), {
  fallback: <div />,
});
const MessageNoticePage = loadable(() => import("views/MessageNoticePage"), {
  fallback: <div />,
});
const OfferPage = loadable(() => import("views/OfferPage"), {
  fallback: <div />,
});
const ProjectGroupPage = loadable(() => import("views/ProjectGroupPage"), {
  fallback: <div />,
});
const TestPage = loadable(() => import("__test__"), {
  fallback: <div />,
});
const ReportPage = loadable(() => import("views/ReportPage"), {
  fallback: <div />,
});
const GanttPage = loadable(() => import("views/GrantPage/GrantTable"), {
  fallback: <div />,
});
const ErrorPage = loadable(() => import("views/ErrorPage"), {
  fallback: <div />,
})
const WorkplacePage = loadable(() => import("views/WorkplacePage"), {
  fallback: <div />,
})
const routes = [
  { path: Routes.HOME, exact: true, component: () => <HomePage /> },
  { path: Routes.POST, component: () => <HomePage /> },
  { path: Routes.KANBAN, component: () => <KanbanPage /> },
  { path: Routes.PROJECT_GRANT, component: () => <GanttPage /> },
  { path: Routes.JOB_DETAIL, component: (props) => <JobDetailPage {...props} />, },
  { path: Routes.PROJECTS, component: () => <ProjectGroupPage /> },
  //{ path: Routes.PROJECT, component: () => <ProjectPage /> },
  { path: Routes.MEMBERS, component: () => <MemberPage /> },
  { path: Routes.DEPARTMENTS, component: () => <DepartmentPage /> },
  { path: Routes.REPORT, component: () => <ReportPage /> },
  { path: Routes.DOCUMENT, component: () => <DocumentPage /> },
  { path: Routes.TASKS, component: () => <JobPage /> },
  ...Object.values(jobRoutes).map((path) => ({ path, component: () => <JobPage />, })),
  { path: Routes.OFFERS, component: () => <OfferPage /> },
  { path: Routes.TEST, component: () => <TestPage /> },
  { path: Routes.SETTING_ACCOUNT, component: () => <SettingAccountPage /> },
  { path: Routes.SETTING_GROUP, component: () => <SettingGroupPage /> },
  { path: Routes.LOGIN,
    component: () => (
      <ValidateNoLogin fallback={<Redirect to="/" />}>
        <LoginPage />
      </ValidateNoLogin>
    ),
  },
  { path: Routes.REGISTER,
    component: () => (
      <ValidateNoLogin fallback={<Redirect to="/" />}>
        <RegisterPage />
      </ValidateNoLogin>
    ),
  },
  { path: Routes.FORGOT_PASSWORD, component: () => <ForgotPassword /> },
  { path: Routes.RESET_PASSWORD, component: () => <ResetPassword /> },
  { path: Routes.CALENDAR, component: () => <CalendarPage /> },
  { path: Routes.CALENDAR_WEEKLY, component: () => <CalendarWeeklyPage /> },
  { path: Routes.CALENDAR_PROJECT, component: () => <CalendarProjectPage /> },
  { path: Routes.CALENDAR_ALARM, component: () => <CalendarAlarmPage /> },
  { path: Routes.CONFIRM_REGISTRATION, component: () => <ConfirmRegistration />, },
  { path: Routes.MESSAGE_NOTICE, component: () => <MessageNoticePage /> },
  { path: Routes.WORKPLACE, component: () => <WorkplacePage/> },
  ...(process.env.NODE_ENV !== "production"
    ? [{ path: "/playground", component: () => <Playground /> }]
    : []),
  { path: "", exact: false, component: () => <ErrorPage /> },
];

export default routes;
