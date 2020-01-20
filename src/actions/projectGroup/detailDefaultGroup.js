import {
  DETAIL_DEFAULT_GROUP,
  DETAIL_DEFAULT_GROUP_FAIL,
  DETAIL_DEFAULT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/detailDefaultGroup';

export const detailDefaultGroup = (quite = false) => ({
  type: DETAIL_DEFAULT_GROUP,
  quite,
});

export const detailDefaultGroupSuccess = ({ projectGroup }) => ({
  type: DETAIL_DEFAULT_GROUP_SUCCESS,
  data: {
    projectGroup,
  },
});

export const detailDefaultGroupFail = (error) => ({
  type: DETAIL_DEFAULT_GROUP_FAIL,
  error: error,
});