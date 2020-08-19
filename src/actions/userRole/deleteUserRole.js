import {
  DELETE_USER_ROLE,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/deleteUserRole';

export const deleteUserRole = ({ userRoleId }) => ({
  type: DELETE_USER_ROLE,
  options: {
    userRoleId,
  }
});

export const deleteUserRoleSuccess = (options) => ({
  type: DELETE_USER_ROLE_SUCCESS,
  options,
});

export const deleteUserRoleFail = (error, options) => ({
  type: DELETE_USER_ROLE_FAIL,
  options,
  error,
});