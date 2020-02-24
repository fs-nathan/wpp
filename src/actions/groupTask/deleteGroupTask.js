import {
  DELETE_GROUP_TASK,
  DELETE_GROUP_TASK_SUCCESS,
  DELETE_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/deleteGroupTask';

export const deleteGroupTask = ({ groupTaskId }) => ({
  type: DELETE_GROUP_TASK,
  options: {
    groupTaskId,
  }
});

export const deleteGroupTaskSuccess = (options) => ({
  type: DELETE_GROUP_TASK_SUCCESS,
  options,
});

export const deleteGroupTaskFail = (error, options) => ({
  type: DELETE_GROUP_TASK_FAIL,
  options,
  error,
});