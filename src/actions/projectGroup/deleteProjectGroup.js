import {
  DELETE_PROJECT_GROUP,
  DELETE_PROJECT_GROUP_FAIL,
  DELETE_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/deleteProjectGroup';

export const deleteProjectGroup = ({ projectGroupId }) => ({
  type: DELETE_PROJECT_GROUP,
  options: {
    projectGroupId
  }
});

export const deleteProjectGroupSuccess = () => ({
  type: DELETE_PROJECT_GROUP_SUCCESS,
});

export const deleteProjectGroupFail = (error) => ({
  type: DELETE_PROJECT_GROUP_FAIL,
  error: error,
});