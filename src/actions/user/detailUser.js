import { apiService } from 'constants/axiosInstance';
import {
  DETAIL_USER,
  DETAIL_USER_FAIL,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_RESET,
  CHECK_VERIFY_ACCOUNT,
  CHECK_VERIFY_ACCOUNT_SUCCESS,
  CHECK_VERIFY_ACCOUNT_FAIL,
  GET_USER_INFOR,
  GET_USER_INFOR_FAIL,
<<<<<<< HEAD
  GET_USER_INFOR_SUCCESS
=======
  GET_USER_INFOR_SUCCESS,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAIL
>>>>>>> 2c5d11ca (feature: tab config member)
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

export const actionGetInfor = (userId) => ({
  type: GET_USER_INFOR,
  userId

})

export const actionGetInforFail = error => ({
  type: GET_USER_INFOR_FAIL,
  payload: error
})

export const actionGetInforSuccess = data => ({
  type: GET_USER_INFOR_SUCCESS,
  payload: data
})

export const actionChangeAccount = data => ({
  type: UPDATE_ACCOUNT,
  payload: data
  
})
export const actionChangeAccountSuccess = data => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload: data
  
})
export const actionChangeAccountFail = error => ({
  type: UPDATE_ACCOUNT_FAIL,
  payload: error
  
})