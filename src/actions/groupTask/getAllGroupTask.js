import {
  GET_ALL_GROUP_TASK,
  GET_ALL_GROUP_TASK_SUCCESS,
  GET_ALL_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/getAllGroupTask';

export const getAllGroupTask = (quite = false) => ({
  type: GET_ALL_GROUP_TASK,
  quite,
});

export const getAllGroupTaskSuccess = ({ groupTasks }) => ({
  type: GET_ALL_GROUP_TASK_SUCCESS,
  data: {
    groupTasks,
  },
});

export const getAllGroupTaskFail = (error) => ({
  type: GET_ALL_GROUP_TASK_FAIL,
  error: error,
});