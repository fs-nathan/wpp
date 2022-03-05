import { find, findIndex, get, remove, slice } from 'lodash';
import { CREATE_TASK_SUCCESS } from '../../constants/actions/task/createTask';
import { DELETE_TASK_SUCCESS } from '../../constants/actions/task/deleteTask';
import { LIST_TASK, LIST_TASK_FAIL, LIST_TASK_RESET, LIST_TASK_SUCCESS } from '../../constants/actions/task/listTask';
import { SORT_TASK, SORT_TASK_SUCCESS } from '../../constants/actions/task/sortTask';
import { LIST_TASK_MEMBER_SUCCESS, LIST_TASK_MEMBER_FAIL, LIST_TASK_MEMBER } from '../../constants/actions/task/listTaskMember';
export const initialState = {
  data: {
    tasks: [],
  },
  error: null,
  loading: false,
  firstTime: true,
  newTask: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_TASK:
    case LIST_TASK_MEMBER:
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
        firstTime: false,
      };
    case LIST_TASK_MEMBER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case LIST_TASK_FAIL:
    case LIST_TASK_MEMBER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case LIST_TASK_RESET:
      return initialState;
    case CREATE_TASK_SUCCESS: {
      const newTasks = state.data.tasks.map(groupTask =>
        get(groupTask, 'id') === get(action.data, 'task.group_task')
          ? ({
            ...groupTask,
            tasks: [...groupTask.tasks, get(action.data, 'task')]
          })
          : groupTask
      )
      return {        ...state,
        data: {
          tasks: newTasks,
          ...state.data,
        },
        newTask: get(action.data, 'task')
      };
    }
    case DELETE_TASK_SUCCESS: {
      const newTasks = state.data.tasks.map(groupTask => {
        let _newTasks = get(groupTask, 'tasks', [])
        if (find(_newTasks, { id: get(action.options, 'taskId') }))
          remove(_newTasks, { id: get(action.options, 'taskId') })
        return {
          ...groupTask,
          tasks: _newTasks
        }
      });
      return {
        ...state,
        data: {
          ...state.data,
          tasks: newTasks,
        },
      };
    }
    case SORT_TASK:
    case SORT_TASK_SUCCESS: {
      let removed = [];
      let tasks = state.data.tasks.map(task => {
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
    }
    default:
      return state;
  }
}

export default reducer;