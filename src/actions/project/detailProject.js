import {
  DETAIL_PROJECT,
  DETAIL_PROJECT_FAIL,
  DETAIL_PROJECT_SUCCESS,
} from '../../constants/actions/project/detailProject';

export const detailProject = ({ projectId }) => ({
  type: DETAIL_PROJECT,
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