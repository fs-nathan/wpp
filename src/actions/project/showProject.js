import {
  SHOW_PROJECT,
  SHOW_PROJECT_FAIL,
  SHOW_PROJECT_SUCCESS,
} from '../../constants/actions/project/showProject';

export const showProject = ({ projectId }) => ({
  type: SHOW_PROJECT,
  options: {
    projectId,
  },
});

export const showProjectSuccess = (options) => ({
  type: SHOW_PROJECT_SUCCESS,
  options,
});

export const showProjectFail = (error, options) => ({
  type: SHOW_PROJECT_FAIL,
  options,
  error,
});