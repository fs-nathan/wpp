import {
  LIST_PROJECT_GROUP,
  LIST_PROJECT_GROUP_FAIL,
  LIST_PROJECT_GROUP_SUCCESS,
  LIST_PROJECT_GROUP_RESET,
} from '../../constants/actions/projectGroup/listProjectGroup';

export const listProjectGroup = ({timeStart, timeEnd},quite = false) => ({
  type: LIST_PROJECT_GROUP,
  quite,
  options: {
    timeStart, timeEnd,
  },
});

export const listProjectGroupSuccess = ({ projectGroups }, options) => ({
  type: LIST_PROJECT_GROUP_SUCCESS,
  options,
  data: {
    projectGroups,
  },
});

export const listProjectGroupFail = (error, options) => ({
  type: LIST_PROJECT_GROUP_FAIL,
  options,
  error,
});