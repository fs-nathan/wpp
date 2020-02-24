import {
  LIST_USER_ROLE,
  LIST_USER_ROLE_SUCCESS,
  LIST_USER_ROLE_FAIL,
  LIST_USER_ROLE_RESET,
} from '../../constants/actions/userRole/listUserRole';

export const listUserRole = (quite = false) => ({
  type: LIST_USER_ROLE,
  quite,
});

export const listUserRoleSuccess = ({ userRoles }, options) => ({
  type: LIST_USER_ROLE_SUCCESS,
  options,
  data: {
    userRoles,
  },
});

export const listUserRoleFail = (error, options) => ({
  type: LIST_USER_ROLE_FAIL,
  options,
  error,
});

export const listUserRoleReset = () => ({
  type: LIST_USER_ROLE_RESET,
});