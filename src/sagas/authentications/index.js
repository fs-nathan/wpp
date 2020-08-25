import { call, put } from 'redux-saga/effects';
import { loginSuccess, loginFail } from '../../actions/authentications/';
import { apiService } from '../../constants/axiosInstance';

async function doLogin({ email, password }) {
  try {
    const config = {
      url: '/login',
      method: 'post',
      data: {
        email,
        password,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* login(action) {
  try {
    const { accessToken, refreshToken, group_active } = yield call(doLogin, action.options);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("group-active", group_active);
    apiService.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    apiService.defaults.headers.common["group-active"] = group_active;
    yield put(loginSuccess({ accessToken, refreshToken, groupActive: group_active }));
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* loginCheckState() {
  try {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const group_active = localStorage.getItem("group-active");
    apiService.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    apiService.defaults.headers.common["group-active"] = group_active;
    yield put(loginSuccess({ accessToken, refreshToken, groupActive: group_active }));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export {
  login,
  loginCheckState,
}
