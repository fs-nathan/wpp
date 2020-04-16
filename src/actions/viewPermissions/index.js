import { GET_PERMISSION_VIEW_DETAIL_PROJECT, GET_PERMISSION_VIEW_DETAIL_PROJECT_FAIL, GET_PERMISSION_VIEW_DETAIL_PROJECT_SUCCESS, GET_PERMISSION_VIEW_PROJECTS, GET_PERMISSION_VIEW_PROJECTS_FAIL, GET_PERMISSION_VIEW_PROJECTS_SUCCESS, GET_PERMISSION_VIEW_USERS, GET_PERMISSION_VIEW_USERS_FAIL, GET_PERMISSION_VIEW_USERS_SUCCESS } from '../../constants/actions/viewPermissions';

export const getPermissionViewUser = (quite = false) => ({
  type: GET_PERMISSION_VIEW_USERS,
  quite,
});

export const getPermissionViewUserSuccess = ({ permissions }, options) => ({
  type: GET_PERMISSION_VIEW_USERS_SUCCESS,
  options,
  data: {
    users: permissions,
  },
});

export const getPermissionViewUserFail = (error, options) => ({
  type: GET_PERMISSION_VIEW_USERS_FAIL,
  options,
  error,
});

export const getPermissionViewProjects = (quite = false) => ({
  type: GET_PERMISSION_VIEW_PROJECTS,
  quite,
});

export const getPermissionViewProjectsSuccess = ({ permissions }, options) => ({
  type: GET_PERMISSION_VIEW_PROJECTS_SUCCESS,
  options,
  data: {
    projects: permissions,
  },
});

export const getPermissionViewProjectsFail = (error, options) => ({
  type: GET_PERMISSION_VIEW_PROJECTS_FAIL,
  options,
  error,
});

export const getPermissionViewDetailProject = ({ projectId }, quite = false) => ({
  type: GET_PERMISSION_VIEW_DETAIL_PROJECT,
  quite,
  options: {
    projectId
  }
});

export const getPermissionViewDetailProjectSuccess = ({ permissions }, options) => ({
  type: GET_PERMISSION_VIEW_DETAIL_PROJECT_SUCCESS,
  options,
  data: {
    detailProject: permissions,
  },
});

export const getPermissionViewDetailProjectFail = (error, options) => ({
  type: GET_PERMISSION_VIEW_DETAIL_PROJECT_FAIL,
  options,
  error,
});