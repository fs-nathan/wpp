import { CustomEventEmitter, PROJECT_SCHEDULE_DELETE_DAY_OFF } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { projectScheduleDeleteDayOffFail, projectScheduleDeleteDayOffSuccess } from '../../../actions/calendar/projectCalendar/deleteDayOff';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteDayOff({ scheduleGroupID, dayID }) {
  try {
    const config = {
      url: '/group-schedule/delete-day-not-work',
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

function* projectScheduleDeleteDayOff(action) {
  try {
    const { work_days: workDays } = yield call(doDeleteDayOff, action.options);
    yield put(projectScheduleDeleteDayOffSuccess({ workDays }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_DELETE_DAY_OFF);
  } catch (error) {
    yield put(projectScheduleDeleteDayOffFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleDeleteDayOff };
