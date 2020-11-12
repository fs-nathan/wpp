import { KANBAN_SORT_TASK, KANBAN_SORT_TASK_RESET, KANBAN_SORT_TASK_SUCCESS, KANBAN_SORT_TASK_FAIL } from 'constants/actions/kanban/sortTask';

export const initialState = {
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_SORT_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_SORT_TASK_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_SORT_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_SORT_TASK_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;