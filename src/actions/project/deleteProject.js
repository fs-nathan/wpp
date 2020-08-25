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

export const deleteProjectSuccess = (options) => ({
  type: DELETE_PROJECT_SUCCESS,
  options,
});

export const deleteProjectFail = (error, options) => ({
  type: DELETE_PROJECT_FAIL,
  options,
  error,
});