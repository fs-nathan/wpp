import {
  KANBAN_SORT_GROUP_TASK,
  KANBAN_SORT_GROUP_TASK_RESET,
  KANBAN_SORT_GROUP_TASK_SUCCESS,
  KANBAN_SORT_GROUP_TASK_FAIL,
} from 'constants/actions/kanban/sortGroupTask';

export const sortGroupTask = ({ groupTaskId, sortIndex, dragEndResult }, quite = false) => ({
  type: KANBAN_SORT_GROUP_TASK,
  quite,
  options: {
    groupTaskId, 
    sortIndex,
    dragEndResult,
  },
});

export const sortGroupTaskSuccess = (options) => ({
  type: KANBAN_SORT_GROUP_TASK_SUCCESS,
  options,
});

export const sortGroupTaskFail = (error, options) => ({
  type: KANBAN_SORT_GROUP_TASK_FAIL,
  options,
  error,
});

export const sortGroupTaskReset = () => ({
  type: KANBAN_SORT_GROUP_TASK_RESET,
});