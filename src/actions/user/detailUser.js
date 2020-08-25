import {
  DETAIL_USER,
  DETAIL_USER_FAIL,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_RESET,
} from '../../constants/actions/user/detailUser';

export const detailUser = ({ userId }, quite = false) => ({
  type: DETAIL_USER,
  quite,
  options: {
    userId,
  },
});

export const detailUserSuccess = ({ user }, options) => ({
  type: DETAIL_USER_SUCCESS,
  options,
  data: {
    user,
  },
});

export const detailUserFail = (error, options) => ({
  type: DETAIL_USER_FAIL,
  options,
  error,
});

export const detailUserReset = () => ({
  type: DETAIL_USER_RESET,
});