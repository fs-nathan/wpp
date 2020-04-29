import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listRemindProjectFail, listRemindProjectSuccess } from '../../../actions/calendar/alarmCalendar/listRemindProject';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListRemindProject({ fromTime, toTime }) {
  try {
    const config = {
      url: '/reminds/list-remind-project',
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

function* listRemindProject(action) {
  try {
    const { data: reminds } = yield call(doListRemindProject, action.options);
    yield put(listRemindProjectSuccess({ reminds }, action.options));
  } catch (error) {
    yield put(listRemindProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listRemindProject };
