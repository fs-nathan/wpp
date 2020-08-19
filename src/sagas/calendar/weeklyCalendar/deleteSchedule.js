import { CustomEventEmitter, DELETE_WEEKLY_SCHEDULE } from 'constants/events';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteScheduleFail, deleteScheduleSuccess } from '../../../actions/calendar/weeklyCalendar/deleteSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteSchedule({ scheduleID }) {
  try {
    const config = {
      url: '/work-schedule/delete',
      method: 'delete',
      data: {
        schedule_id: scheduleID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteSchedule(action) {
  try {
    const { id: id } = yield call(doDeleteSchedule, action.options);
    yield put(deleteScheduleSuccess({ id }, action.options));
    CustomEventEmitter(DELETE_WEEKLY_SCHEDULE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { deleteSchedule };

