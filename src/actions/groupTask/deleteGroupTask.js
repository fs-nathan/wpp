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

export const deleteGroupTaskSuccess = () => ({
  type: DELETE_GROUP_TASK_SUCCESS,
  data: {
  },
});

export const deleteGroupTaskFail = (error) => ({
  type: DELETE_GROUP_TASK_FAIL,
  error: error,
});