import {
  LIST_GROUP_TASK,
  LIST_GROUP_TASK_SUCCESS,
  LIST_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/listGroupTask';

export const listGroupTask = ({ projectId, }, quite = false) => ({
  type: LIST_GROUP_TASK,
  quite,
  options: {
    projectId,
  }
});

export const listGroupTaskSuccess = ({ groupTasks }) => ({
  type: LIST_GROUP_TASK_SUCCESS,
  data: {
    groupTasks,
  },
});

export const listGroupTaskFail = (error) => ({
  type: LIST_GROUP_TASK_FAIL,
  error: error,
});