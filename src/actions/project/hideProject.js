import {
  HIDE_PROJECT,
  HIDE_PROJECT_FAIL,
  HIDE_PROJECT_SUCCESS,
} from '../../constants/actions/project/hideProject';

export const hideProject = ({ projectId }) => ({
  type: HIDE_PROJECT,
  options: {
    projectId,
  },
});

export const hideProjectSuccess = (options) => ({
  type: HIDE_PROJECT_SUCCESS,
  options
});

export const hideProjectFail = (error, options) => ({
  type: HIDE_PROJECT_FAIL,
  options,
  error,
});