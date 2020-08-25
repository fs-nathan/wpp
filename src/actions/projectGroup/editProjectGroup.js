import {
  EDIT_PROJECT_GROUP,
  EDIT_PROJECT_GROUP_FAIL,
  EDIT_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/editProjectGroup';

export const editProjectGroup = ({ projectGroupId, name, icon, description }) => ({
  type: EDIT_PROJECT_GROUP,
  options: {
    projectGroupId,
    name,
    icon,
    description,
  },
});

export const editProjectGroupSuccess = ({ projectGroup }, options) => ({
  type: EDIT_PROJECT_GROUP_SUCCESS,
  options,
  data: {
    projectGroup
  }
});

export const editProjectGroupFail = (error, options) => ({
  type: EDIT_PROJECT_GROUP_FAIL,
  options,
  error,
});