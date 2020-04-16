import { SORT_TASK, SORT_TASK_FAIL, SORT_TASK_SUCCESS } from '../../constants/actions/task/sortTask';

export const initialState = {
  data: null,
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SORT_TASK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SORT_TASK_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case SORT_TASK_FAIL:
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