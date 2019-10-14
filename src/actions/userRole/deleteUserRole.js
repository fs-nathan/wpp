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

export const deleteUserRoleSuccess = () => ({
  type: DELETE_USER_ROLE_SUCCESS,
});

export const deleteUserRoleFail = (error) => ({
  type: DELETE_USER_ROLE_FAIL,
  error: error,
});