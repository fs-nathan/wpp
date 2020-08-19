import {
  SORT_PROJECT_GROUP,
  SORT_PROJECT_GROUP_FAIL,
  SORT_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/sortProjectGroup';

export const sortProjectGroup = ({ projectGroupId, sortIndex }) => ({
  type: SORT_PROJECT_GROUP,
  options: {
    projectGroupId,
    sortIndex,
  },
});

export const sortProjectGroupSuccess = (options) => ({
  type: SORT_PROJECT_GROUP_SUCCESS,
  options,
});

export const sortProjectGroupFail = (error, options) => ({
  type: SORT_PROJECT_GROUP_FAIL,
  options,
  error,
});