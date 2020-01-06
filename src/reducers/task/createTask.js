import {
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
} from '../../constants/actions/task/createTask';

export const initialState = {
  data: {
    taskId: null,
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
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_TASK_FAIL:
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