import {
  UPDATE_STATE_JOIN_TASK,
  UPDATE_STATE_JOIN_TASK_SUCCESS,
  UPDATE_STATE_JOIN_TASK_FAIL,
} from '../../constants/actions/project/updateStateJoinTask';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATE_JOIN_TASK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_STATE_JOIN_TASK_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case UPDATE_STATE_JOIN_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;