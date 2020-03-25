import { concat, get, remove } from 'lodash';
import { DELETE_LEVEL, DELETE_LEVEL_FAIL, DELETE_LEVEL_SUCCESS } from '../../constants/actions/level/deleteLevel';

export const initialState = {
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_LEVEL: {
      const newPendings = concat(state.pendings, get(action.options, 'levelId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_LEVEL_SUCCESS: {
      let newPendings = state.pendings;
      remove(newPendings, pending => pending === get(action.options, 'levelId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_LEVEL_FAIL: {
      let newPendings = state.pendings;
      remove(newPendings, pending => pending === get(action.options, 'levelId'))
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