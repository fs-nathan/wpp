import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listRemindRecentlyFail, listRemindRecentlySuccess } from '../../../actions/calendar/alarmCalendar/listRemindRecently';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListRemindRecently() {
  try {
    const config = {
      url: '/reminds/list-remind-recently',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listRemindRecently(action) {
  try {
    const { data: reminds } = yield call(doListRemindRecently, action.options);
    yield put(listRemindRecentlySuccess({ reminds }, action.options));
  } catch (error) {
    yield put(listRemindRecentlyFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listRemindRecently };

