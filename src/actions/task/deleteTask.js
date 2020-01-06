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

export const deleteTaskSuccess = () => ({
  type: DELETE_TASK_SUCCESS,
});

export const deleteTaskFail = (error) => ({
  type: DELETE_TASK_FAIL,
  error: error,
});