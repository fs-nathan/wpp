import { apiService } from "constants/axiosInstance";
import {
  DETAIL_USER,
  DETAIL_USER_FAIL,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_RESET,
  CHECK_VERIFY_ACCOUNT_SUCCESS,
  CHECK_VERIFY_ACCOUNT_FAIL,
  GET_USER_INFOR,
  GET_USER_INFOR_FAIL,
  GET_USER_INFOR_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAIL,
} from "../../constants/actions/user/detailUser";

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

export const actionCheckVerifyAccount = () => {
  const token = localStorage.getItem("token");
  const config = {
    url: "/request-verify",
    method: "post",
    header: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };
  return apiService(config);
};

export const actionCheckVerifyAccountFail = (error) => ({
  type: CHECK_VERIFY_ACCOUNT_FAIL,
  payload: error,
});

export const actionCheckVerifyAccountSuccess = (data) => ({
  type: CHECK_VERIFY_ACCOUNT_SUCCESS,
  payload: data,
});

export const actionGetInfor = (userId) => ({
  type: GET_USER_INFOR,
  userId,
});

export const actionGetInforFail = (error) => ({
  type: GET_USER_INFOR_FAIL,
  payload: error,
});

export const actionGetInforSuccess = (data) => ({
  type: GET_USER_INFOR_SUCCESS,
  payload: data,
});

export const actionChangeAccount = (data) => {
  const config = {
    url: "/update-account",
    method: "post",
    data,
  };
  return apiService(config);
};
export const actionChangeAccountSuccess = (data) => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload: data,
});
export const actionChangeAccountFail = (error) => ({
  type: UPDATE_ACCOUNT_FAIL,
  payload: error,
});

export const actionResetPassword = (data) => {
  const config = {
    url: "/users/reset-password",
    method: "post",
    data,
  };
  return apiService(config);
};

export const actionUpdateUser = (data) => {
  const config = {
    url: "/update-user",
    method: "put",
    data,
  };
  return apiService(config);
};

export const actionLockUser = (data) => {
  const config = {
    url: "/users/lock-account",
    method: "post",
    data,
  };
  return apiService(config);
};

export const actionUnLockUser = (data) => {
  const config = {
    url: "/users/unlock-account",
    method: "post",
    data,
  };
  return apiService(config);
};
