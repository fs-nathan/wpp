import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listProjectScheduleFail, listProjectScheduleSuccess } from '../../../actions/calendar/projectCalendar/listSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListProjectSchedule() {
  try {
    const config = {
      url: '/group-schedule/list-schedule',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectGroupSchedule(action) {
  try {
    const { schedules: schedules } = yield call(doListProjectSchedule, action.options);
    yield put(listProjectScheduleSuccess({ schedules }, action.options));
  } catch (error) {
    yield put(listProjectScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listProjectGroupSchedule };

