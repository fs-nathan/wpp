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

export const createUserRoleSuccess = ({ userRole }) => ({
  type: CREATE_USER_ROLE_SUCCESS,
  data: {
    userRole,
  },
});

export const createUserRoleFail = (error) => ({
  type: CREATE_USER_ROLE_FAIL,
  error: error,
});