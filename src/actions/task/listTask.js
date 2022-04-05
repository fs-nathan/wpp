import {
  LIST_TASK,
  LIST_TASK_FAIL,
  LIST_TASK_SUCCESS,
  LIST_TASK_RESET,
  ADD_GROUP_TASK,
} from "../../constants/actions/task/listTask";

export const listTask = ({ projectId, timeStart, timeEnd }, quite = false) => ({
  type: LIST_TASK,
  quite,
  options: {
    projectId,
    timeStart,
    timeEnd,
  },
});

export const listTaskSuccess = ({ tasks, summary_row }, options) => ({
  type: LIST_TASK_SUCCESS,
  options,
  data: {
    tasks,
    summary_row,
  },
});

export const listTaskFail = (error, options) => ({
  type: LIST_TASK_FAIL,
  options,
  error,
});

export const listTaskReset = () => ({
  type: LIST_TASK_RESET,
});

export const addNewGroupTask = (payload) => ({
  type: ADD_GROUP_TASK,
  payload,
});
