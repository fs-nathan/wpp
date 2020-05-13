import { CustomEventEmitter, PROJECT_SCHEDULE_ADD_DAY_OFF } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { projectScheduleAddDayOffFail, projectScheduleAddDayOffSuccess } from '../../../actions/calendar/projectCalendar/addDayOff';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doAddDayOff({ scheduleGroupID, dateStart, dateEnd }) {
  try {
    const config = {
      url: '/group-schedule/add-day-not-work',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        date_start: dateStart,
        date_end: dateEnd
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleAddDayOff(action) {
  try {
    const { work_days: workDays } = yield call(doAddDayOff, action.options);
    yield put(projectScheduleAddDayOffSuccess({ workDays }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_ADD_DAY_OFF);
  } catch (error) {
    yield put(projectScheduleAddDayOffFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
    CustomEventEmitter(PROJECT_SCHEDULE_ADD_DAY_OFF);
  }
}

export { projectScheduleAddDayOff };

