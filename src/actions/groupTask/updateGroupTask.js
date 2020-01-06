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

export const updateGroupTaskSuccess = ({ groupTask }) => ({
  type: UPDATE_GROUP_TASK_SUCCESS,
  data: {
    groupTask,
  },
});

export const updateGroupTaskFail = (error) => ({
  type: UPDATE_GROUP_TASK_FAIL,
  error: error,
});