import {
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
} from '../../constants/actions/project/updateProject';

export const updateProject = ({ projectId, name, description, projectGroupId, priority, currency }) => ({
  type: UPDATE_PROJECT,
  options: {
    projectId,
    name,
    description,
    projectGroupId,
    priority,
    currency,
  },
});

export const updateProjectSuccess = () => ({
  type: UPDATE_PROJECT_SUCCESS,
});

export const updateProjectFail = (error) => ({
  type: UPDATE_PROJECT_FAIL,
  error: error,
});