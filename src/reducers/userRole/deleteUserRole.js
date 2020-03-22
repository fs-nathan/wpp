import { concat, get, remove } from 'lodash';
import { DELETE_USER_ROLE, DELETE_USER_ROLE_FAIL, DELETE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/deleteUserRole';

export const initialState = {
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_ROLE: {
      const newPendings = concat(state.pendings, action.options, 'userRoleId')
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_USER_ROLE_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'userRoleId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_USER_ROLE_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'userRoleId'))
      return {
        ...state,
        error: action.error,
        pendings: newPendings,
      }
    }
    default:
      return state;
  }
}

export default reducer;