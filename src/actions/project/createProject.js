import {
  CREATE_PROJECT,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
} from "../../constants/actions/project/createProject";

export const createProject = ({
  name,
  description,
  projectGroupId,
  priority,
  currency,
  project_label_id,
  view_default,
}) => ({
  type: CREATE_PROJECT,
  options: {
    name,
    description,
    projectGroupId,
    priority,
    currency,
    project_label_id,
    view_default: view_default,
  },
});

export const createProjectSuccess = ({ project }, options) => ({
  type: CREATE_PROJECT_SUCCESS,
  options,
  data: {
    project,
  },
});

export const createProjectFail = (error, options) => ({
  type: CREATE_PROJECT_FAIL,
  options,
  error,
});
