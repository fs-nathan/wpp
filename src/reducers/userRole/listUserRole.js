import {
  LIST_USER_ROLE,
  LIST_USER_ROLE_SUCCESS,
  LIST_USER_ROLE_FAIL,
} from '../../constants/actions/userRole/listUserRole';
import { concat, get, findIndex, remove} from 'lodash';
import { CREATE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/createUserRole';
import { DELETE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/deleteUserRole';
import { UPDATE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/updateUserRole';

export const initialState = {
  data: {
    userRoles: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
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
    case CREATE_USER_ROLE_SUCCESS: {
      const newUserRoles = concat(state.data.userRoles, get(action.data, 'userRole'));
      return {
        ...state,
        data: {
          ...state.data,
          userRoles: newUserRoles,
        }
      };
    }
    case UPDATE_USER_ROLE_SUCCESS: {
      const index = findIndex(state.data.userRoles, { id: get(action.data, 'userRole.id') });
      let newUserRoles = state.data.userRoles;
      newUserRoles[index] = {
        ...newUserRoles[index],
        ...get(action.data, 'userRole')
      }
      return {
        ...state,
        data: {
          ...state.data,
          userRoles: newUserRoles
        }
      }
    }
    case DELETE_USER_ROLE_SUCCESS: {
      let newUserRoles = state.data.userRoles;
      remove(newUserRoles, { id: get(action.options, 'userRoleId') });
      return {
        ...state,
        data: {
          ...state.data,
          userRoles: newUserRoles,
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;