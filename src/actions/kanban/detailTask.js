import {
  KANBAN_DETAIL_TASK,
  KANBAN_DETAIL_TASK_RESET,
  KANBAN_DETAIL_TASK_SUCCESS,
  KANBAN_DETAIL_TASK_FAIL,
} from 'constants/actions/kanban/detailTask';

export const detailTask = ({ taskId }, quite = false) => ({
  type: KANBAN_DETAIL_TASK,
  quite,
  options: {
    taskId
  },
});

export const detailTaskSuccess = ({ task }, options) => ({
  type: KANBAN_DETAIL_TASK_SUCCESS,
  options,
  data: {
    task,
  }
});

export const detailTaskFail = (error, options) => ({
  type: KANBAN_DETAIL_TASK_FAIL,
  options,
  error,
});

export const detailTaskReset = () => ({
  type: KANBAN_DETAIL_TASK_RESET,
});