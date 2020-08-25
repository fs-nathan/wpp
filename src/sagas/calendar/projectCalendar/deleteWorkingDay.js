import { CustomEventEmitter, PROJECT_SCHEDULE_DELETE_WORKING_DAYS } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { projectScheduleDeleteWorkingDayFail, projectScheduleDeleteWorkingDaySuccess } from '../../../actions/calendar/projectCalendar/deleteWorkingDay';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteWorkingDays({ scheduleGroupID, dayID }) {
  try {
    const config = {
      url: '/group-schedule/delete-work-day',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        day_id: dayID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleDeleteWorkingDays(action) {
  try {
    const { work_days: workDays } = yield call(doDeleteWorkingDays, action.options);
    yield put(projectScheduleDeleteWorkingDaySuccess({ workDays }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_DELETE_WORKING_DAYS);
  } catch (error) {
    yield put(projectScheduleDeleteWorkingDayFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleDeleteWorkingDays };
