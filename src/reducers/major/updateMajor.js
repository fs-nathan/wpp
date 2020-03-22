import { concat, get, remove } from 'lodash';
import { UPDATE_MAJOR, UPDATE_MAJOR_FAIL, UPDATE_MAJOR_SUCCESS } from '../../constants/actions/major/updateMajor';

export const initialState = {
  data: {
    major: null,
  },
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MAJOR: {
      const newPendings = concat(state.pendings, get(action.options, 'majorId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_MAJOR_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.data, 'major.id'))
      return {
        ...state,
        data: action.data,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_MAJOR_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'majorId'))
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