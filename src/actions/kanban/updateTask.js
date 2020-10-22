import {
  KANBAN_UPDATE_TASK,
  KANBAN_UPDATE_TASK_RESET,
  KANBAN_UPDATE_TASK_SUCCESS,
  KANBAN_UPDATE_TASK_FAIL,
} from 'constants/actions/kanban/updateTask';

export const updateTask = ({ taskId, name, description }, quite = false) => ({
  type: KANBAN_UPDATE_TASK,
  quite,
  options: {
    taskId,
    name,
    description,
  },
});

export const updateTaskSuccess = ({ task }, options) => ({
  type: KANBAN_UPDATE_TASK_SUCCESS,
  options,
  data: {
    task,
  }
});

export const updateTaskFail = (error, options) => ({
  type: KANBAN_UPDATE_TASK_FAIL,
  options,
  error,
});

export const updateTaskReset = () => ({
  type: KANBAN_UPDATE_TASK_RESET,
});