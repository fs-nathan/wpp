import { concat, get, remove } from 'lodash';
import { PUBLIC_MEMBER, PUBLIC_MEMBER_FAIL, PUBLIC_MEMBER_SUCCESS } from '../../constants/actions/user/publicMember';

export const initialState = {
  pendings: [],
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PUBLIC_MEMBER: {
      const newPendings = concat(state.pendings, get(action.options, 'userId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case PUBLIC_MEMBER_SUCCESS: {
      let newPendings = state.pendings;
      remove(newPendings, item => item === get(action.options, 'userId'))
      return {
        ...state,
        ...initialState,
        error: null,
        pendings: newPendings,
      };
    }
    case PUBLIC_MEMBER_FAIL: {
      let newPendings = state.pendings;
      remove(newPendings, item => item === get(action.options, 'userId'))
      return {
        ...state,
        ...initialState,
        error: action.error,
        pendings: newPendings,
      };
    }
    default:
      return state;
  }
}

export default reducer;