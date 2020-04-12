import { concat, get, remove } from 'lodash';
import { DELETE_POSITION, DELETE_POSITION_FAIL, DELETE_POSITION_SUCCESS } from '../../constants/actions/position/deletePosition';

export const initialState = {
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_POSITION: {
      const newPendings = concat(state.pendings, get(action.options, 'positionId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_POSITION_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'positionId'))
      return {
        ...state,
        ...initialState,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_POSITION_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'positionId'))
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