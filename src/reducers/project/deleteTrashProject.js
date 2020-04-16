import { concat, get, remove } from 'lodash';
import { DELETE_TRASH_PROJECT, DELETE_TRASH_PROJECT_FAIL, DELETE_TRASH_PROJECT_SUCCESS } from '../../constants/actions/project/deleteTrashProject';

export const initialState = {
  error: null,
  pendings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_TRASH_PROJECT: {
      const newPendings = concat(state.pendings, get(action.options, 'projectId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_TRASH_PROJECT_SUCCESS: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'projectId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    case DELETE_TRASH_PROJECT_FAIL: {
      let newPendings = state.pendings
      remove(newPendings, pending => pending === get(action.options, 'projectId'))
      return {
        ...state,
        error: null,
        pendings: newPendings,
      }
    }
    default:
      return state;
  }
}

export default reducer;