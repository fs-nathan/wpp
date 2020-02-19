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

export const deleteProjectGroupSuccess = (options) => ({
  type: DELETE_PROJECT_GROUP_SUCCESS,
  options,
});

export const deleteProjectGroupFail = (error, options) => ({
  type: DELETE_PROJECT_GROUP_FAIL,
  options,
  error,
});