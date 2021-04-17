import {
  DETAIL_USER,
  DETAIL_USER_FAIL,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_RESET,
  CHECK_VERIFY_ACCOUNT,
  CHECK_VERIFY_ACCOUNT_SUCCESS,
  CHECK_VERIFY_ACCOUNT_FAIL
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

export const actionCheckVerifyAccount = () => ({
  type: CHECK_VERIFY_ACCOUNT
})

export const actionCheckVerifyAccountFail = error => ({
  type: CHECK_VERIFY_ACCOUNT_FAIL,
  payload: error
})

export const actionCheckVerifyAccountSuccess = data => ({
  type: CHECK_VERIFY_ACCOUNT_SUCCESS,
  payload: data
})