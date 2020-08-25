import {
  UPDATE_GROUP_TASK,
  UPDATE_GROUP_TASK_SUCCESS,
  UPDATE_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/updateGroupTask ';

export const updateGroupTask = ({ groupTaskId, name, description }) => ({
  type: UPDATE_GROUP_TASK,
  options: {
    groupTaskId,
    name,
    description,
  }
});

export const updateGroupTaskSuccess = ({ groupTask }, options) => ({
  type: UPDATE_GROUP_TASK_SUCCESS,
  options,
  data: {
    groupTask,
  },
});

export const updateGroupTaskFail = (error, options) => ({
  type: UPDATE_GROUP_TASK_FAIL,
  options,
  error,
});