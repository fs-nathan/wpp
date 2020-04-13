import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { permissionProjectFail, permissionProjectSuccess } from '../../actions/project/permissionProject';
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

function* permissionProject(action) {
  try {
    const { group_permissions: groupPermissions } = yield call(doPermissionProject, action.options);
    yield put(permissionProjectSuccess({ groupPermissions }, action.options));
  } catch (error) {
    yield put(permissionProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { permissionProject, };

