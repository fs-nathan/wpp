import { LOADPAGE_TASK_DUE, LOAD_TASK_OVERVIEW } from "./types";

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
