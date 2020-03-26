import { concat, get, remove } from 'lodash';
import { UPDATE_LEVEL, UPDATE_LEVEL_FAIL, UPDATE_LEVEL_SUCCESS } from '../../constants/actions/level/updateLevel';

export const initialState = {
  data: {
    level: null,
  },
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LEVEL: {
      const newPendings = concat(state.pendings, get(action.options, 'levelId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_LEVEL_SUCCESS: {
      let newPendings = state.pendings;
      remove(newPendings, pending => pending === get(action.data, 'level.id'))
      return {
        ...state,
        data: action.data,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_LEVEL_FAIL: {
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