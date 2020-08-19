import { CustomEventEmitter, PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createShiftStageAllTimeFail, createShiftStageAllTimeSuccess } from '../../../actions/calendar/projectCalendar/createShiftStageAllTime';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreateShiftStageAllTime({ scheduleGroupID, name, timeStart, timeEnd }) {
  try {
    const config = {
      url: '/group-schedule/create-shift-of-step-all-time',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        name: name,
        time_start: timeStart,
        time_end: timeEnd
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleCreateShiftStageAllTime(action) {
  try {
    const { shifts: shifts } = yield call(doCreateShiftStageAllTime, action.options);
    yield put(createShiftStageAllTimeSuccess({ shifts }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_CREATE_SHIFT_STAGE_ALLTIME);
  } catch (error) {
    yield put(createShiftStageAllTimeFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleCreateShiftStageAllTime };

