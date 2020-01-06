import {
  CREATE_PROJECT,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
} from '../../constants/actions/project/createProject';

export const createProject = ({ name, description, projectGroupId, priority, currency }) => ({
  type: CREATE_PROJECT,
  options: {
    name,
    description,
    projectGroupId,
    priority,
    currency,
  },
});

export const createProjectSuccess = ({ project }) => ({
  type: CREATE_PROJECT_SUCCESS,
  data: {
    project,
  },
});

export const createProjectFail = (error) => ({
  type: CREATE_PROJECT_FAIL,
  error: error,
});