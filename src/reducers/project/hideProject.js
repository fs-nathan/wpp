import { concat, get, remove } from 'lodash';
import { HIDE_PROJECT, HIDE_PROJECT_FAIL, HIDE_PROJECT_SUCCESS } from '../../constants/actions/project/hideProject';

export const initialState = {
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_PROJECT: {
      const newPendings = concat(state.pendings, get(action.options, 'projectId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case HIDE_PROJECT_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'projectId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case HIDE_PROJECT_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'projectId'))
      return {
        ...state,
        ...initialState,
        error: action.error,
        pendings: newPendings,
      }
    }
    default:
      return state;
  }
}

export default reducer;