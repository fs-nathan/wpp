import {
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
} from '../../constants/actions/project/updateProject';

export const updateProject = ({ projectId, name, description, projectGroupId, priority, currency, work_type }) => ({
  type: UPDATE_PROJECT,
  options: {
    projectId,
    name,
    description,
    projectGroupId,
    priority,
    currency,
    work_type
  },
});

export const updateProjectSuccess = ({ project }, options) => ({
  type: UPDATE_PROJECT_SUCCESS,
  options,
  data: {
    project,
  }
});

export const updateProjectFail = (error, options) => ({
  type: UPDATE_PROJECT_FAIL,
  options,
  error,
});