import { REMOVE_GROUP_PERMISSION_USER, REMOVE_GROUP_PERMISSION_USER_FAIL, REMOVE_GROUP_PERMISSION_USER_SUCCESS } from '../../constants/actions/user/removeGroupPermissionUser';

export const removeGroupPermissionUser = ({ userId }) => ({
  type: REMOVE_GROUP_PERMISSION_USER,
  options: {
    userId,
  },
});

export const removeGroupPermissionUserSuccess = (options) => ({
  type: REMOVE_GROUP_PERMISSION_USER_SUCCESS,
  options,
});

export const removeGroupPermissionUserFail = (error, options) => ({
  type: REMOVE_GROUP_PERMISSION_USER_FAIL,
  options,
  error,
});