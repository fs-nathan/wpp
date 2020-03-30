import {
  LOADPAGE_TASK,
  LOADPAGE_TASK_ASSIGN,
  LOADPAGE_TASK_DUE,
  LOADPAGE_TASK_ROLE,
  LOAD_TASK_OVERVIEW
} from "./types";
export const loadTaskPage = timeRange => {
  return {
    type: LOADPAGE_TASK,
    payload: {
      timeRange
    }
  };
};
export const loadTaskOverViewPage = timeRange => {
  return {
    type: LOAD_TASK_OVERVIEW,
    payload: {
      timeRange
    }
  };
};
export const loadTaskDuePage = () => {
  return {
    type: LOADPAGE_TASK_DUE
  };
};
export const loadTaskAssignPage = ({ timeStart, typeAssign, timeEnd }) => {
  return {
    type: LOADPAGE_TASK_ASSIGN,
    payload: {
      timeStart,
      typeAssign,
      timeEnd
    }
  };
};
export const loadTaskRolePage = ({ timeStart, roleId, timeEnd }) => {
  return {
    type: LOADPAGE_TASK_ROLE,
    payload: {
      timeStart,
      roleId,
      timeEnd
    }
  };
};
