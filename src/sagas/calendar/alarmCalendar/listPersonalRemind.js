import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listPersonalRemindFail, listPersonalRemindSuccess } from '../../../actions/calendar/alarmCalendar/listPersonalRemind';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListPersonalRemind({ fromTime, toTime }) {
  try {
    const config = {
      url: '/personal-remind/list',
      method: 'get',
      params: {
        from_time: fromTime,
        to_time: toTime
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listPersonalRemind(action) {
  try {
    const { data: reminds } = yield call(doListPersonalRemind, action.options);
    yield put(listPersonalRemindSuccess({ reminds }, action.options));
  } catch (error) {
    yield put(listPersonalRemindFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listPersonalRemind };

