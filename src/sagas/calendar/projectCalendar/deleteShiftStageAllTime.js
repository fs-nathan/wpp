import { CustomEventEmitter, PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteShiftStageAllTimeFail, deleteShiftStageAllTimeSuccess } from '../../../actions/calendar/projectCalendar/deleteShiftStageAllTime';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteShiftStageAllTime({ scheduleGroupID, shiftID }) {
  try {
    const config = {
      url: '/group-schedule/delete-shift-of-step-all-time',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        shift_id: shiftID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleDeleteShiftStageAllTime(action) {
  try {
    const { shifts: shifts } = yield call(doDeleteShiftStageAllTime, action.options);
    yield put(deleteShiftStageAllTimeSuccess({ shifts }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_DELETE_SHIFT_STAGE_ALLTIME);
  } catch (error) {
    yield put(deleteShiftStageAllTimeFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleDeleteShiftStageAllTime };

