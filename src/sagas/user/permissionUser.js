import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { permissionUserFail, permissionUserSuccess } from '../../actions/user/permissionUser';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doPermissionProject({ module }) {
  try {
    const config = {
      url: '/permissions/list-group-permission',
      method: 'get',
      params: {
        module,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

async function doAdminPermission({ groupPermissionId }) {
  try {
    const config = {
      url: '/permissions/detail-group-permission-default',
      method: 'get',
      params: {
        group_permission_id: groupPermissionId
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* permissionUser(action) {
  try {
    const { group_permissions: groupPermissions } = yield call(doPermissionProject, action.options);
    const { group_detail: adminPermission } = yield call(doAdminPermission, action.options);
    yield put(permissionUserSuccess({ groupPermissions, adminPermission }, action.options));
  } catch (error) {
    yield put(permissionUserFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { permissionUser, };

