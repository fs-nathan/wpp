import {
  LIST_USER_ROLE,
  LIST_USER_ROLE_SUCCESS,
  LIST_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/listUserRole';

export const listUserRole = (quite = false) => ({
  type: LIST_USER_ROLE,
  quite,
});

export const listUserRoleSuccess = ({ userRoles }) => ({
  type: LIST_USER_ROLE_SUCCESS,
  data: {
    userRoles,
  },
});

export const listUserRoleFail = (error) => ({
  type: LIST_USER_ROLE_FAIL,
  error: error,
});