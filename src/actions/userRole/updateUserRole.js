import {
  UPDATE_USER_ROLE,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/updateUserRole';

export const updateUserRole = ({ userRoleId, name, description }) => ({
  type: UPDATE_USER_ROLE,
  options: {
    userRoleId,
    name,
    description,
  }
});

export const updateUserRoleSuccess = ({ userRole }, options) => ({
  type: UPDATE_USER_ROLE_SUCCESS,
  options,
  data: {
    userRole,
  }
});

export const updateUserRoleFail = (error, options) => ({
  type: UPDATE_USER_ROLE_FAIL,
  options,
  error,
});