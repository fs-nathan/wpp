import { CustomEventEmitter, PROJECT_SCHEDULE_DELETE_SHIFT_STAGE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteShiftStageFail, deleteShiftStageSuccess } from '../../../actions/calendar/projectCalendar/deleteShiftStage';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteShiftStage({ scheduleGroupID, stageID, shiftID }) {
  try {
    const config = {
      url: '/group-schedule/delete-shift-of-stage',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        stage_id: stageID,
        shift_id: shiftID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleDeleteShiftStage(action) {
  try {
    const { shifts: shifts } = yield call(doDeleteShiftStage, action.options);
    yield put(deleteShiftStageSuccess({ shifts }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_DELETE_SHIFT_STAGE);
  } catch (error) {
    yield put(deleteShiftStageFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleDeleteShiftStage };

