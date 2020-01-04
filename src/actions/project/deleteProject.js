import {
  DELETE_PROJECT,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
} from '../../constants/actions/project/deleteProject';

export const deleteProject = ({ projectId }) => ({
  type: DELETE_PROJECT,
  options: {
    projectId,
  },
});

export const deleteProjectSuccess = () => ({
  type: DELETE_PROJECT_SUCCESS,
});

export const deleteProjectFail = (error) => ({
  type: DELETE_PROJECT_FAIL,
  error: error,
});