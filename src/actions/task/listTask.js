import {
  LIST_TASK,
  LIST_TASK_FAIL,
  LIST_TASK_SUCCESS,
} from '../../constants/actions/task/listTask';

export const listTask = ({ projectId }, quite = false) => ({
  type: LIST_TASK,
  quite,
  options: {
    projectId,
  },
});

export const listTaskSuccess = ({ tasks }) => ({
  type: LIST_TASK_SUCCESS,
  data: {
    tasks,
  }
});

export const listTaskFail = (error) => ({
  type: LIST_TASK_FAIL,
  error: error,
});