import { UPDATE_GROUP_PERMISSION_USER, UPDATE_GROUP_PERMISSION_USER_FAIL, UPDATE_GROUP_PERMISSION_USER_SUCCESS } from '../../constants/actions/user/updateGroupPermissionUser';

export const updateGroupPermissionUser = ({ userId, groupPermission }) => ({
  type: UPDATE_GROUP_PERMISSION_USER,
  options: {
    userId,
    groupPermission,
  },
});

export const updateGroupPermissionUserSuccess = (options) => ({
  type: UPDATE_GROUP_PERMISSION_USER_SUCCESS,
  options,
});

export const updateGroupPermissionUserFail = (error, options) => ({
  type: UPDATE_GROUP_PERMISSION_USER_FAIL,
  options,
  error,
});