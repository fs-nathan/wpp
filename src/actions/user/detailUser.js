import {
  DETAIL_USER,
  DETAIL_USER_FAIL,
  DETAIL_USER_SUCCESS,
} from '../../constants/actions/user/detailUser';

export const detailUser = ({ userId }, quite = false) => ({
  type: DETAIL_USER,
  quite,
  options: {
    userId,
  },
});

export const detailUserSuccess = ({ user }) => ({
  type: DETAIL_USER_SUCCESS,
  data: {
    user,
  },
});

export const detailUserFail = (error) => ({
  type: DETAIL_USER_FAIL,
  error: error,
});