import { KANBAN_LIST_TASK, KANBAN_LIST_TASK_RESET, KANBAN_LIST_TASK_SUCCESS, KANBAN_LIST_TASK_FAIL } from 'constants/actions/kanban/listTask';

export const initialState = {
  data: {
    tasks: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_LIST_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_LIST_TASK_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_LIST_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_LIST_TASK_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;