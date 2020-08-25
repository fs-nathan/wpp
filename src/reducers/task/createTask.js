import { CREATE_TASK, CREATE_TASK_FAIL, CREATE_TASK_SUCCESS } from '../../constants/actions/task/createTask';

export const initialState = {
  data: {
    task: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_TASK_FAIL:
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