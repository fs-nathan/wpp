import {
  CREATE_GROUP_TASK,
  CREATE_GROUP_TASK_SUCCESS,
  CREATE_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/createGroupTask';

export const createGroupTask = ({ projectId, name, description }) => ({
  type: CREATE_GROUP_TASK,
  options: {
    projectId,
    name,
    description,
  }
});

export const createGroupTaskSuccess = ({ groupTask }) => ({
  type: CREATE_GROUP_TASK_SUCCESS,
  data: {
    groupTask,
  },
});

export const createGroupTaskFail = (error) => ({
  type: CREATE_GROUP_TASK_FAIL,
  error: error,
});