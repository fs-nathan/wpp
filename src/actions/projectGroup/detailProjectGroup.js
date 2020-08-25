import {
  DETAIL_PROJECT_GROUP,
  DETAIL_PROJECT_GROUP_FAIL,
  DETAIL_PROJECT_GROUP_SUCCESS,
  DETAIL_PROJECT_GROUP_RESET,
} from '../../constants/actions/projectGroup/detailProjectGroup';

export const detailProjectGroup = ({ projectGroupId }, quite = false) => ({
  type: DETAIL_PROJECT_GROUP,
  quite,
  options: {
    projectGroupId,
  }
});

export const detailProjectGroupSuccess = ({ projectGroup }, options) => ({
  type: DETAIL_PROJECT_GROUP_SUCCESS,
  options,
  data: {
    projectGroup,
  },
});

export const detailProjectGroupFail = (error, options) => ({
  type: DETAIL_PROJECT_GROUP_FAIL,
  options,
  error,
});

export const detailProjectGroupReset = () => ({
  type: DETAIL_PROJECT_GROUP_RESET,
})