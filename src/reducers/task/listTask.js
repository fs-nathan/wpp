import {
  LIST_TASK,
  LIST_TASK_SUCCESS,
  LIST_TASK_FAIL,
} from '../../constants/actions/task/listTask';
import {
  SORT_TASK,
} from '../../constants/actions/task/sortTask';
import { get, findIndex, remove, slice } from 'lodash';

export const initialState = {
  data: {
    tasks: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let tasks = [];
  let removed = [];
  switch (action.type) {
    case LIST_TASK:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_TASK_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SORT_TASK:
      tasks = [...state.data.tasks].map(task => {
        let _tasks = get(task, 'tasks', []);
        if (findIndex(_tasks, { id: get(action.options, 'taskId') }) > -1)
          removed = remove(_tasks, { id: get(action.options, 'taskId') });
        return ({
          ...task,
          tasks: _tasks,
        });
      });
      tasks = tasks.map(task => {
        let _tasks = get(task, 'tasks', []);
        if (get(action.options, 'groupTask') === get(task, 'id')) {
          _tasks = [...slice(_tasks, 0, action.options.sortIndex), ...removed, ...slice(_tasks, action.options.sortIndex)];
        };
        return ({
          ...task,
          tasks: _tasks,
        });
      });
      return {
        ...state,
        data: {
          tasks,
        },
      };
    default:
      return state;
  }
}

export default reducer;