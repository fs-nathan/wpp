import {
  ADD_GROUP_TASK,
  ADD_GROUP_TASK_SUCCESS,
  ADD_GROUP_TASK_FAILED,
} from "../../constants/actions/task/listTask";

export const createGroupTask = ({ projectId, name, description }) => ({
  type: ADD_GROUP_TASK,
  options: {
    projectId,
    name,
    description,
  },
});

export const createGroupTaskSuccess = ({ groupTask, oldId }, options) => ({
  type: ADD_GROUP_TASK_SUCCESS,
  options,
  data: {
    groupTask,
    oldId,
  },
});

export const createGroupTaskFail = (error, options) => ({
  type: ADD_GROUP_TASK_FAILED,
  options,
  error,
});
