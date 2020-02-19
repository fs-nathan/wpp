import {
  SORT_TASK,
  SORT_TASK_FAIL,
  SORT_TASK_SUCCESS,
} from '../../constants/actions/task/sortTask';

export const sortTask = ({ taskId, projectId, groupTask, sortIndex }) => ({
  type: SORT_TASK,
  options: {
    taskId,
    projectId,
    groupTask,
    sortIndex,
  },
});

export const sortTaskSuccess = (options) => ({
  type: SORT_TASK_SUCCESS,
  options,
});

export const sortTaskFail = (error, options) => ({
  type: SORT_TASK_FAIL,
  options,
  error,
});