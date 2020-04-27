import { CustomEventEmitter, PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateShiftStageAllTimeFail, updateShiftStageAllTimeSuccess } from '../../../actions/calendar/projectCalendar/updateShiftStageAllTime';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateShiftStageAllTime({ scheduleGroupID, shiftID, name, timeStart, timeEnd }) {
  try {
    const config = {
      url: '/group-schedule/update-shift-of-step-all-time',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        shift_id: shiftID,
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

function* projectScheduleUpdateShiftStageAllTime(action) {
  try {
    const { shifts: shifts } = yield call(doUpdateShiftStageAllTime, action.options);
    yield put(updateShiftStageAllTimeSuccess({ shifts }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE_ALLTIME);
  } catch (error) {
    yield put(updateShiftStageAllTimeFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleUpdateShiftStageAllTime };

