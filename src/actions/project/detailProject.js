import {
  DETAIL_PROJECT,
  DETAIL_PROJECT_FAIL,
  DETAIL_PROJECT_SUCCESS,
} from '../../constants/actions/project/detailProject';

export const detailProject = ({ projectId }, quite = false) => ({
  type: DETAIL_PROJECT,
  quite,
  options: {
    projectId,
  },
});

export const detailProjectSuccess = ({ project }) => ({
  type: DETAIL_PROJECT_SUCCESS,
  data: {
    project,
  }
});

export const detailProjectFail = (error) => ({
  type: DETAIL_PROJECT_FAIL,
  error: error,
});