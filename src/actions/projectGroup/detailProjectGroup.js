import {
  DETAIL_PROJECT_GROUP,
  DETAIL_PROJECT_GROUP_FAIL,
  DETAIL_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/detailProjectGroup';

export const detailProjectGroup = ({ projectGroupId }) => ({
  type: DETAIL_PROJECT_GROUP,
  options: {
    projectGroupId,
  }
});

export const detailProjectGroupSuccess = ({ projectGroup }) => ({
  type: DETAIL_PROJECT_GROUP_SUCCESS,
  data: {
    projectGroup,
  },
});

export const detailProjectGroupFail = (error) => ({
  type: DETAIL_PROJECT_GROUP_FAIL,
  error: error,
});