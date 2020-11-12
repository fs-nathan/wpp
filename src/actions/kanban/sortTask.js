import {
  KANBAN_SORT_TASK,
  KANBAN_SORT_TASK_RESET,
  KANBAN_SORT_TASK_SUCCESS,
  KANBAN_SORT_TASK_FAIL,
} from 'constants/actions/kanban/sortTask';

export const sortTask = ({ taskId, projectId, groupTask, sortIndex, dragEndResult }, quite = false) => ({
  type: KANBAN_SORT_TASK,
  quite,
  options: {
    taskId, 
    projectId, 
    groupTask, 
    sortIndex,
    dragEndResult,
  },
});

export const sortTaskSuccess = (options) => ({
  type: KANBAN_SORT_TASK_SUCCESS,
  options,
});

export const sortTaskFail = (error, options) => ({
  type: KANBAN_SORT_TASK_FAIL,
  options,
  error,
});

export const sortTaskReset = () => ({
  type: KANBAN_SORT_TASK_RESET,
});