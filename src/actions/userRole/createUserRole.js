import {
  CREATE_USER_ROLE,
  CREATE_USER_ROLE_SUCCESS,
  CREATE_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/createUserRole';

export const createUserRole = ({ name, description }) => ({
  type: CREATE_USER_ROLE,
  options: {
    name,
    description,
  }
});

export const createUserRoleSuccess = ({ userRole }, options) => ({
  type: CREATE_USER_ROLE_SUCCESS,
  options,
  data: {
    userRole,
  },
});

export const createUserRoleFail = (error, options) => ({
  type: CREATE_USER_ROLE_FAIL,
  options,
  error,
});