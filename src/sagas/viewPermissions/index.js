import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getPermissionViewDetailProjectFail, getPermissionViewDetailProjectSuccess, getPermissionViewProjectsFail, getPermissionViewProjectsSuccess, getPermissionViewUserFail, getPermissionViewUserSuccess } from '../../actions/viewPermissions';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetPermissionViewProjects() {
  try {
    const config = {
      url: '/permissions/get-permission-view-project',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getPermissionViewProjects(action) {
  try {
    const { permissions } = yield call(doGetPermissionViewProjects);
    yield put(getPermissionViewProjectsSuccess({ permissions }, action.options));
  } catch (error) {
    yield put(getPermissionViewProjectsFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

async function doGetPermissionViewUsers() {
  try {
    const config = {
      url: '/permissions/get-permission-view-user',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getPermissionViewUsers(action) {
  try {
    const { permissions } = yield call(doGetPermissionViewUsers);
    yield put(getPermissionViewUserSuccess({ permissions }, action.options));
  } catch (error) {
    yield put(getPermissionViewUserFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

async function doGetPermissionViewDetailProject({ projectId }) {
  try {
    const config = {
      url: '/permissions/get-permission-view-detail-project',
      method: 'get',
      params: {
        project_id: projectId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getPermissionViewDetailProject(action) {
  try {
    const { permissions } = yield call(doGetPermissionViewDetailProject, action.options);
    yield put(getPermissionViewDetailProjectSuccess({ permissions }, action.options));
  } catch (error) {
    yield put(getPermissionViewDetailProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getPermissionViewProjects, getPermissionViewUsers, getPermissionViewDetailProject, };

