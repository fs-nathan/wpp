import {
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
} from "../../constants/actions/project/updateProject";

export const updateProject = ({
  projectId,
  name,
  description,
  projectGroupId,
  priority,
  currency,
  work_type,
  project_label_id,
}) => ({
  type: UPDATE_PROJECT,
  options: {
    projectId,
    name,
    description,
    projectGroupId,
    priority,
    currency,
    work_type,
    project_label_id,
  },
});

export const updateProjectSuccess = ({ project }, options) => ({
  type: UPDATE_PROJECT_SUCCESS,
  options,
  data: {
    project,
  },
});

export const updateProjectFail = (error, options) => ({
  type: UPDATE_PROJECT_FAIL,
  options,
  error,
});
