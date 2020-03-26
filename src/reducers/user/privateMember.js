import { concat, get, remove } from 'lodash';
import { PRIVATE_MEMBER, PRIVATE_MEMBER_FAIL, PRIVATE_MEMBER_SUCCESS } from '../../constants/actions/user/privateMember';

export const initialState = {
  pendings: [],
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PRIVATE_MEMBER: {
      const newPendings = concat(state.pendings, get(action.options, 'userId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case PRIVATE_MEMBER_SUCCESS: {
      let newPendings = state.pendings;
      remove(newPendings, item => item === get(action.options, 'userId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      };
    }
    case PRIVATE_MEMBER_FAIL: {
      let newPendings = state.pendings;
      remove(newPendings, item => item === get(action.options, 'userId'))
      return {
        ...state,
        error: action.error,
        pendings: newPendings,
      };
    }
    default:
      return state;
  }
}

export default reducer;