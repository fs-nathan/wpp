import {
  KANBAN_LIST_TASK,
  KANBAN_LIST_TASK_RESET,
  KANBAN_LIST_TASK_SUCCESS,
  KANBAN_LIST_TASK_FAIL,
} from 'constants/actions/kanban/listTask';

export const listTask = ({ projectId }, quite = false) => ({
  type: KANBAN_LIST_TASK,
  quite,
  options: {
    projectId
  },
});

export const listTaskSuccess = ({ tasks }, options) => ({
  type: KANBAN_LIST_TASK_SUCCESS,
  options,
  data: {
    tasks,
  }
});

export const listTaskFail = (error, options) => ({
  type: KANBAN_LIST_TASK_FAIL,
  options,
  error,
});

export const listTaskReset = () => ({
  type: KANBAN_LIST_TASK_RESET,
});