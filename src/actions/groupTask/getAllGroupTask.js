import {
  GET_ALL_GROUP_TASK,
  GET_ALL_GROUP_TASK_SUCCESS,
  GET_ALL_GROUP_TASK_FAIL,
  GET_ALL_GROUP_TASK_RESET,
} from '../../constants/actions/groupTask/getAllGroupTask';

export const getAllGroupTask = (quite = false) => ({
  type: GET_ALL_GROUP_TASK,
  quite,
});

export const getAllGroupTaskSuccess = ({ groupTasks }, options) => ({
  type: GET_ALL_GROUP_TASK_SUCCESS,
  options,
  data: {
    groupTasks,
  },
});

export const getAllGroupTaskFail = (error, options) => ({
  type: GET_ALL_GROUP_TASK_FAIL,
  options,
  error,
});

export const getAllGroupTaskReset = () => ({
  type: GET_ALL_GROUP_TASK_RESET,
});