import {
  CREATE_PROJECT_GROUP,
  CREATE_PROJECT_GROUP_FAIL,
  CREATE_PROJECT_GROUP_SUCCESS,
} from "../../constants/actions/projectGroup/createProjectGroup";

export const createProjectGroup = ({
  name,
  icon,
  description,
  work_types,
  color,
}) => ({
  type: CREATE_PROJECT_GROUP,
  options: {
    name,
    icon,
    description,
    work_types,
    color,
  },
});

export const createProjectGroupSuccess = ({ projectGroup }, options) => ({
  type: CREATE_PROJECT_GROUP_SUCCESS,
  options,
  data: {
    projectGroup,
  },
});

export const createProjectGroupFail = (error, options) => ({
  type: CREATE_PROJECT_GROUP_FAIL,
  options,
  error,
});
