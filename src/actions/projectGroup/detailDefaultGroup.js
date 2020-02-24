import {
  DETAIL_DEFAULT_GROUP,
  DETAIL_DEFAULT_GROUP_FAIL,
  DETAIL_DEFAULT_GROUP_SUCCESS,
  DETAIL_DEFAULT_GROUP_RESET,
} from '../../constants/actions/projectGroup/detailDefaultGroup';

export const detailDefaultGroup = (quite = false) => ({
  type: DETAIL_DEFAULT_GROUP,
  quite,
});

export const detailDefaultGroupSuccess = ({ projectGroup }, options) => ({
  type: DETAIL_DEFAULT_GROUP_SUCCESS,
  options,
  data: {
    projectGroup,
  },
});

export const detailDefaultGroupFail = (error, options) => ({
  type: DETAIL_DEFAULT_GROUP_FAIL,
  options,
  error,
});

export const detailDefaultGroupReset = () => ({
  type: DETAIL_DEFAULT_GROUP_RESET,
});