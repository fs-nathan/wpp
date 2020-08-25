import { CustomEventEmitter, DELETE_ALL_WEEKLY_SCHEDULE } from 'constants/events';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteAllScheduleFail, deleteAllScheduleSuccess } from '../../../actions/calendar/weeklyCalendar/deleteAllSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteAllSchedule({ year, week }) {
  try {
    const config = {
      url: '/work-schedule/delete-schedule-of-week',
      method: 'delete',
      data: {
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

function* deleteAllSchedule(action) {
  try {
    const { state: state } = yield call(doDeleteAllSchedule, action.options);
    yield put(deleteAllScheduleSuccess({ state }, action.options));
    CustomEventEmitter(DELETE_ALL_WEEKLY_SCHEDULE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteAllScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { deleteAllSchedule };

