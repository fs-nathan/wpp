import {
  LIST_PROJECT,
  LIST_PROJECT_FAIL,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_RESET,
} from '../../constants/actions/project/listProject';

export const listProject = ({ groupProject, type, status, timeStart, timeEnd }, quite = false) => ({
  type: LIST_PROJECT,
  quite,
  options: {
    groupProject,
    type,
    status,
    timeStart, timeEnd,
  },
});

export const listProjectSuccess = ({ projects, summary }, options) => ({
  type: LIST_PROJECT_SUCCESS,
  options,
  data: {
    projects,
    summary,
  }
});

export const listProjectFail = (error, options) => ({
  type: LIST_PROJECT_FAIL,
  options,
  error,
});

export const listProjectReset = () => ({
  type: LIST_PROJECT_RESET,
});