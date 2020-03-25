import { concat, get, remove } from 'lodash';
import { UPDATE_POSITION, UPDATE_POSITION_FAIL, UPDATE_POSITION_SUCCESS } from '../../constants/actions/position/updatePosition';

export const initialState = {
  data: {
    position: null,
  },
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POSITION: {
      const newPendings = concat(state.pendings, get(action.options, 'positionId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_POSITION_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.data, 'position.id'))
      return {
        ...state,
        data: action.data,
        error: null,
        pendings: newPendings,
      }
    }
    case UPDATE_POSITION_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'positionId'))
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    default:
      return state;
  }
}

export default reducer;