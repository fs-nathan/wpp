import {
  DELETE_TASK,
  DELETE_TASK_FAIL,
  DELETE_TASK_SUCCESS,
} from '../../constants/actions/task/deleteTask';

export const deleteTask = ({ taskId }) => ({
  type: DELETE_TASK,
  options: {
    taskId,
  },
});

export const deleteTaskSuccess = (options) => ({
  type: DELETE_TASK_SUCCESS,
  options,
});

export const deleteTaskFail = (error, options) => ({
  type: DELETE_TASK_FAIL,
  options,
  error,
});