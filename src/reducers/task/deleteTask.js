import { DELETE_TASK, DELETE_TASK_FAIL, DELETE_TASK_SUCCESS } from '../../constants/actions/task/deleteTask';

export const initialState = {
  data: null,
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_TASK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;