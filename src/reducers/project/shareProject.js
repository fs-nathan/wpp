// import { concat, get, remove } from 'lodash';
import {
  SHARE_PROJECT,
  SHARE_PROJECT_FAIL,
  SHARE_PROJECT_SUCCESS,
} from "../../constants/actions/project/shareProject";

export const initialState = {
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHARE_PROJECT: {
      // const newPendings = concat(state.pendings, get(action.options, 'projectId'))
      return {
        ...state,
        error: null,
        loading: false,
      };
    }
    case SHARE_PROJECT_SUCCESS: {
      // let newPendings = state.pendings
      // remove(newPendings, pending => pending === get(action.options, 'projectId'))
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    }
    case SHARE_PROJECT_FAIL: {
      // let newPendings = state.pendings
      // remove(newPendings, pending => pending === get(action.options, 'p'))
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;
