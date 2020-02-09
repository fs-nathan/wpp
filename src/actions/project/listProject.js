import {
  LIST_PROJECT,
  LIST_PROJECT_FAIL,
  LIST_PROJECT_SUCCESS,
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

export const listProjectSuccess = ({ projects }) => ({
  type: LIST_PROJECT_SUCCESS,
  data: {
    projects,
  }
});

export const listProjectFail = (error) => ({
  type: LIST_PROJECT_FAIL,
  error: error,
});