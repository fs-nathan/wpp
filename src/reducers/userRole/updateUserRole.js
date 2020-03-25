import { concat, get, remove } from 'lodash';
import { UPDATE_USER_ROLE, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_SUCCESS } from '../../constants/actions/userRole/updateUserRole';

export const initialState = {
  data: {
    userRole: null
  },
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ROLE: {
      const newPendings = concat(state.pendings, get(action.options, 'userRoleId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_USER_ROLE_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.data, 'userRole.id'))
      return {
        ...state,
        data: action.data,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_USER_ROLE_FAIL: {
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