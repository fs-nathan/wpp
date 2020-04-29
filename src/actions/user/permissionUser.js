import { PERMISSION_USER, PERMISSION_USER_FAIL, PERMISSION_USER_RESET, PERMISSION_USER_SUCCESS } from '../../constants/actions/user/permissionUser';

export const permissionUser = (quite = false) => ({
  type: PERMISSION_USER,
  quite,
  options: {
    module: 1,
    groupPermissionId: 1,
  },
});

export const permissionUserSuccess = ({ groupPermissions, adminPermission }, options) => ({
  type: PERMISSION_USER_SUCCESS,
  options,
  data: {
    groupPermissions,
    adminPermission,
  }
});

export const permissionUserFail = (error, options) => ({
  type: PERMISSION_USER_FAIL,
  options,
  error,
});

export const permissionUserReset = () => ({
  type: PERMISSION_USER_RESET,
});