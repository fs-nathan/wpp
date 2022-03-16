import {
  DEFAULT_GROUP_TASK,
  DEFAULT_GROUP_TASK_SUCCESS,
  DEFAULT_GROUP_TASK_FAIL,
} from "../../constants/actions/groupTask/defaultGroupTask";

export const defaultGroupTask = (idGroupTaskDefault) => {
  return {
    type: DEFAULT_GROUP_TASK,
    payload: idGroupTaskDefault,
  };
};

export const defaultGroupTaskSuccess = (idGroupTaskDefault) => ({
  type: DEFAULT_GROUP_TASK_SUCCESS,
  payload: idGroupTaskDefault,
});

export const defaultGroupTaskFail = (error) => ({
  type: DEFAULT_GROUP_TASK_FAIL,
  error,
});
