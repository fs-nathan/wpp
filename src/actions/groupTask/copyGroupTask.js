import {
  COPY_GROUP_TASK,
  COPY_GROUP_TASK_SUCCESS,
  COPY_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/copyGroupTask';

export const copyGroupTask = ({ groupTaskId, projectId }) => ({
  type: COPY_GROUP_TASK,
  options: {
    groupTaskId,
    projectId,
  }
});

export const copyGroupTaskSuccess = ({ groupTasks }, options) => ({
  type: COPY_GROUP_TASK_SUCCESS,
  options,
  data: {
    groupTasks,
  }
});

export const copyGroupTaskFail = (error, options) => ({
  type: COPY_GROUP_TASK_FAIL,
  options,
  error,
});