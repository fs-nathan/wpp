import { KANBAN_UPDATE_TASK, KANBAN_UPDATE_TASK_RESET, KANBAN_UPDATE_TASK_SUCCESS, KANBAN_UPDATE_TASK_FAIL } from 'constants/actions/kanban/updateTask';

export const initialState = {
  data: {
    task: null,
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case KANBAN_UPDATE_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_UPDATE_TASK_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_UPDATE_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_UPDATE_TASK_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;