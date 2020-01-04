import {
  LIST_PROJECT_GROUP,
  LIST_PROJECT_GROUP_FAIL,
  LIST_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/listProjectGroup';

export const listProjectGroup = (quite = false) => ({
  type: LIST_PROJECT_GROUP,
  quite,
});

export const listProjectGroupSuccess = ({ projectGroups }) => ({
  type: LIST_PROJECT_GROUP_SUCCESS,
  data: {
    projectGroups,
  },
});

export const listProjectGroupFail = (error) => ({
  type: LIST_PROJECT_GROUP_FAIL,
  error: error,
});