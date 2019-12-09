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

export const showProjectSuccess = () => ({
  type: SHOW_PROJECT_SUCCESS,
});

export const showProjectFail = (error) => ({
  type: SHOW_PROJECT_FAIL,
  error: error,
});