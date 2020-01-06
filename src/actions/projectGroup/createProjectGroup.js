import {
  CREATE_PROJECT_GROUP,
  CREATE_PROJECT_GROUP_FAIL,
  CREATE_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/createProjectGroup';

export const createProjectGroup = ({ name, icon, description }) => ({
  type: CREATE_PROJECT_GROUP,
  options: {
    name,
    icon,
    description,
  },
});

export const createProjectGroupSuccess = ({ projectGroupId }) => ({
  type: CREATE_PROJECT_GROUP_SUCCESS,
  data: {
    projectGroupId,
  },
});

export const createProjectGroupFail = (error) => ({
  type: CREATE_PROJECT_GROUP_FAIL,
  error: error,
});