import {
  KANBAN_DETAIL_PROJECT,
  KANBAN_DETAIL_PROJECT_RESET,
  KANBAN_DETAIL_PROJECT_SUCCESS,
  KANBAN_DETAIL_PROJECT_FAIL,
} from 'constants/actions/kanban/detailProject';

export const detailProject = ({ projectId }, quite = false) => ({
  type: KANBAN_DETAIL_PROJECT,
  quite,
  options: {
    projectId
  },
});

export const detailProjectSuccess = ({ project }, options) => ({
  type: KANBAN_DETAIL_PROJECT_SUCCESS,
  options,
  data: {
    project,
  }
});

export const detailProjectFail = (error, options) => ({
  type: KANBAN_DETAIL_PROJECT_FAIL,
  options,
  error,
});

export const detailProjectReset = () => ({
  type: KANBAN_DETAIL_PROJECT_RESET,
});