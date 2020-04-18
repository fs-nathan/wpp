import { PERMISSION_PROJECT, PERMISSION_PROJECT_FAIL, PERMISSION_PROJECT_RESET, PERMISSION_PROJECT_SUCCESS } from '../../constants/actions/project/permissionProject';

export const permissionProject = (quite = false) => ({
  type: PERMISSION_PROJECT,
  quite,
  options: {
    module: 1,
  },
});

export const permissionProjectSuccess = ({ groupPermissions, adminPermission }, options) => ({
  type: PERMISSION_PROJECT_SUCCESS,
  options,
  data: {
    groupPermissions,
    adminPermission,
  }
});

export const permissionProjectFail = (error, options) => ({
  type: PERMISSION_PROJECT_FAIL,
  options,
  error,
});

export const permissionProjectReset = () => ({
  type: PERMISSION_PROJECT_RESET,
});