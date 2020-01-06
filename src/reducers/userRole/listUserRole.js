import {
  LIST_USER_ROLE,
  LIST_USER_ROLE_SUCCESS,
  LIST_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/listUserRole';
import {concat, get, findIndex, remove} from 'lodash';
import { CREATE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/createUserRole';
import { DELETE_USER_ROLE } from '../../constants/actions/userRole/deleteUserRole';
import { UPDATE_USER_ROLE, UPDATE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/updateUserRole';

export const initialState = {
  data: {
    userRoles: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let userRoles = [];
  let index = 0;
  switch (action.type) {
    case LIST_USER_ROLE:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_USER_ROLE_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_USER_ROLE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CREATE_USER_ROLE_SUCCESS: 
      userRoles = concat(state.data.userRoles, action.data.userRole);
      return {
        ...state,
        data: {
          userRoles,
        }
      };
    case UPDATE_USER_ROLE: 
      userRoles = [...state.data.userRoles];
      index = findIndex(userRoles, { id: get(action.options, 'userRoleId') });
      userRoles[index] = {
        ...userRoles[index],
        ...action.options,
      };
      return {
        ...state,
        data: {
          userRoles,
        }
      };
    case UPDATE_USER_ROLE_SUCCESS: 
      userRoles = [...state.data.userRoles];
      index = findIndex(userRoles, { id: get(action.data.userRole, 'id') });
      userRoles[index] = {
        ...userRoles[index],
        ...action.data.userRole,
      };
      return {
        ...state,
        data: {
          userRoles,
        }
      };
    case DELETE_USER_ROLE:
      userRoles = [...state.data.userRoles];
      remove(userRoles, { id: get(action.options, 'userRoleId') });
      return {
        ...state,
        data: {
          userRoles,
        }
      };
    default:
      return state;
  }
}

export default reducer;