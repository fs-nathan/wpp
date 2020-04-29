import { CustomEventEmitter, PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateShiftStageFail, updateShiftStageSuccess } from '../../../actions/calendar/projectCalendar/updateShiftStage';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateShiftStage({ scheduleGroupID, stageID, shiftID, name, timeStart, timeEnd }) {
  try {
    const config = {
      url: '/group-schedule/update-shift-of-stage',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        stage_id: stageID,
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

function* projectScheduleUpdateShiftStage(action) {
  try {
    const { shifts: shifts } = yield call(doUpdateShiftStage, action.options);
    yield put(updateShiftStageSuccess({ shifts }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_UPDATE_SHIFT_STAGE);
  } catch (error) {
    yield put(updateShiftStageFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleUpdateShiftStage };

