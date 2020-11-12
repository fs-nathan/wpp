import { KANBAN_DETAIL_TASK, KANBAN_DETAIL_TASK_RESET, KANBAN_DETAIL_TASK_SUCCESS, KANBAN_DETAIL_TASK_FAIL } from 'constants/actions/kanban/detailTask';
import { KANBAN_UPDATE_TASK_SUCCESS } from 'constants/actions/kanban/updateTask';
import { get } from 'lodash';

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
    case KANBAN_DETAIL_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case KANBAN_DETAIL_TASK_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case KANBAN_DETAIL_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case KANBAN_DETAIL_TASK_RESET:
      return initialState;
    case KANBAN_UPDATE_TASK_SUCCESS: {
      let newTask = state.data.task;
      if (get(action.data, 'task.id') === get(state.data, 'task.id')) {
        newTask = {
          ...newTask,
          ...get(action.data, 'task'),
        }
      }
      return {
        ...state,
        data: {
          ...state.data,
          task: newTask,
        },
        error: action.error,
        loading: false,
        firstTime: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;