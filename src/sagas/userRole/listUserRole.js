import { call, put } from 'redux-saga/effects';
import { listUserRoleSuccess, listUserRoleFail } from '../../actions/userRole/listUserRole';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListPosition() {
  try {
    const config = {
      url: '/list-user-role',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listUserRole() {
  try {
    const { user_roles: userRoles } = yield call(doListPosition);
    yield put(listUserRoleSuccess({ userRoles }, action.options));
  } catch (error) {
    yield put(listUserRoleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listUserRole,
}
