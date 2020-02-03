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

export const sortTaskSuccess = () => ({
  type: SORT_TASK_SUCCESS,
});

export const sortTaskFail = (error) => ({
  type: SORT_TASK_FAIL,
  error: error,
});