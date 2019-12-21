import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_CHECK_STATE
} from '../../constants/actions/authentications';
import { apiService } from '../../constants/axiosInstance';

export const login = ({ email, password }) => ({
  type: LOGIN,
  options: {
    email,
    password
  }
});

export const loginSuccess = ({ accessToken, refreshToken, groupActive }) => ({
  type: LOGIN_SUCCESS,
  data: {
    accessToken,
    refreshToken,
    groupActive
  }
});

export const loginFail = error => ({
  type: LOGIN_FAIL,
  error: error
});

export const loginCheckState = () => ({
  type: LOGIN_CHECK_STATE
});

export const actionlogin = ({ email, password }) => {
  const config = {
    url: '/login',
    method: 'post',
    data: {
      email,
      password
    }
  };
  return apiService(config);
};
