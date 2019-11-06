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

export const sortProjectGroupSuccess = () => ({
  type: SORT_PROJECT_GROUP_SUCCESS,
});

export const sortProjectGroupFail = (error) => ({
  type: SORT_PROJECT_GROUP_FAIL,
  error: error,
});