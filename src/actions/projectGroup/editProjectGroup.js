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

export const editProjectGroupSuccess = () => ({
  type: EDIT_PROJECT_GROUP_SUCCESS,
});

export const editProjectGroupFail = (error) => ({
  type: EDIT_PROJECT_GROUP_FAIL,
  error: error,
});