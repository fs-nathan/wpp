import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listProjectFail, listScheduleSuccess } from '../../../actions/calendar/weeklyCalendar/listSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListSchedule({ year }) {
  try {
    const config = {
      url: '/work-schedule/get-list-schedule-of-year',
      method: 'get',
      params: {
        year: year
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listWeeklySchedule(action) {
  try {
    const { data: calendars } = yield call(doListSchedule, action.options);
    yield put(listScheduleSuccess({ calendars }, action.options));
  } catch (error) {
    yield put(listProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listWeeklySchedule };

