import { concat, get, remove } from 'lodash';
import { DELETE_MAJOR, DELETE_MAJOR_FAIL, DELETE_MAJOR_SUCCESS } from '../../constants/actions/major/deleteMajor';

export const initialState = {
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_MAJOR: {
      const newPendings = concat(state.pendings, get(action.options, 'majorId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_MAJOR_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'majorId'))
      return {
        ...state,
        ...initialState,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_MAJOR_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'majorId'))
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