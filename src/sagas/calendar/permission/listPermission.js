import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listCalendarPermissionFail, listCalendarPermissionSuccess } from '../../../actions/calendar/permission/listPermission';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListCalendarPermission() {
  try {
    const config = {
      url: '/permissions/get-permission-view-calendar',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listCalendarPermission(action) {
  try {
    const { permissions: permissions } = yield call(doListCalendarPermission, action.options);
    yield put(listCalendarPermissionSuccess({ permissions }, action.options));
  } catch (error) {
    yield put(listCalendarPermissionFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listCalendarPermission };

