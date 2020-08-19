import {
  LIST_GROUP_TASK,
  LIST_GROUP_TASK_SUCCESS,
  LIST_GROUP_TASK_FAIL,
  LIST_GROUP_TASK_RESET,
} from '../../constants/actions/groupTask/listGroupTask';

export const listGroupTask = ({ projectId }, quite = false) => ({
  type: LIST_GROUP_TASK,
  quite,
  options: {
    projectId,
  }
});

export const listGroupTaskSuccess = ({ groupTasks }, options) => ({
  type: LIST_GROUP_TASK_SUCCESS,
  options,
  data: {
    groupTasks,
  },
});

export const listGroupTaskFail = (error, options) => ({
  type: LIST_GROUP_TASK_FAIL,
  options,
  error,
});

export const listGroupTaskReset = () => ({
  type: LIST_GROUP_TASK_RESET,
});