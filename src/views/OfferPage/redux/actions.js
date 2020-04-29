import {
  LOADPAGE_TASK,
  LOADPAGE_TASK_ASSIGN,
  LOADPAGE_TASK_DUE,
  LOADPAGE_TASK_ROLE,
  LOAD_TASK_OVERVIEW,
} from "./types";
export const loadTaskPage = (timeRange) => {
  return {
    type: LOADPAGE_TASK,
    payload: {
      timeRange,
    },
  };
};
export const loadTaskOverViewPage = (timeRange) => {
  return {
    type: LOAD_TASK_OVERVIEW,
    payload: {
      timeRange,
    },
  };
};
export const loadTaskDuePage = (timeRange) => {
  return {
    type: LOADPAGE_TASK_DUE,
    payload: {
      timeRange,
    },
  };
};
export const loadTaskAssignPage = (timeRange) => {
  return {
    type: LOADPAGE_TASK_ASSIGN,
    payload: timeRange,
  };
};
export const loadTaskRolePage = (timeRange) => {
  return {
    type: LOADPAGE_TASK_ROLE,
    payload: timeRange,
  };
};
