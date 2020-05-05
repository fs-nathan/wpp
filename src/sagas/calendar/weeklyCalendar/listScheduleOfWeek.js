import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listScheduleOfWeekFail, listScheduleOfWeekSuccess } from '../../../actions/calendar/weeklyCalendar/listScheduleOfWeek';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListScheduleOfWeek({ year, week }) {
  try {
    const config = {
      url: '/work-schedule/list-of-week',
      method: 'get',
      params: {
        year: year,
        week: week
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listScheduleOfWeek(action) {
  try {
    const { data: schedules } = yield call(doListScheduleOfWeek, action.options);
    yield put(listScheduleOfWeekSuccess({ schedules }, action.options));
  } catch (error) {
    yield put(listScheduleOfWeekFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listScheduleOfWeek };

