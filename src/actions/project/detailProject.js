import {
  DETAIL_PROJECT,
  DETAIL_PROJECT_FAIL,
  DETAIL_PROJECT_SUCCESS,
  DETAIL_PROJECT_RESET,
} from '../../constants/actions/project/detailProject';

export const detailProject = ({ projectId }, quite = false) => ({
  type: DETAIL_PROJECT,
  quite,
  options: {
    projectId,
  },
});

export const detailProjectSuccess = ({ project }, options) => ({
  type: DETAIL_PROJECT_SUCCESS,
  options,
  data: {
    project,
  }
});

export const detailProjectFail = (error, options) => ({
  type: DETAIL_PROJECT_FAIL,
  options,
  error,
});

export const detailProjectReset = () => ({
  type: DETAIL_PROJECT_RESET,
});