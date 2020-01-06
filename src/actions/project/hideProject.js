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

export const hideProjectSuccess = () => ({
  type: HIDE_PROJECT_SUCCESS,
});

export const hideProjectFail = (error) => ({
  type: HIDE_PROJECT_FAIL,
  error: error,
});