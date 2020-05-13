import { CustomEventEmitter, PROJECT_SCHEDULE_ADD_WORKING_DAYS } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { projectScheduleAddWorkingDayFail, projectScheduleAddWorkingDaySuccess } from '../../../actions/calendar/projectCalendar/addWorkingDay';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doAddWorkingDays({ scheduleGroupID, dateStart, dateEnd }) {
  try {
    const config = {
      url: '/group-schedule/add-work-day',
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

function* projectScheduleAddWorkingDays(action) {
  try {
    const { work_days: workDays } = yield call(doAddWorkingDays, action.options);
    yield put(projectScheduleAddWorkingDaySuccess({ workDays }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_ADD_WORKING_DAYS);
  } catch (error) {
    yield put(projectScheduleAddWorkingDayFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
    CustomEventEmitter(PROJECT_SCHEDULE_ADD_WORKING_DAYS);
  }
}

export { projectScheduleAddWorkingDays };

