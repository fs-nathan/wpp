import { CustomEventEmitter, PROJECT_SCHEDULE_CREATE_SHIFT_STAGE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createShiftStageFail, createShiftStageSuccess } from '../../../actions/calendar/projectCalendar/createShiftStage';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreateShiftStage({ scheduleGroupID, stageID, name, timeStart, timeEnd }) {
  try {
    const config = {
      url: '/group-schedule/create-shift-of-stage',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        stage_id: stageID,
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

function* projectScheduleCreateShiftStage(action) {
  try {
    const { shifts: shifts, stage_id: stage_id } = yield call(doCreateShiftStage, action.options);
    yield put(createShiftStageSuccess({ shifts, stage_id }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_CREATE_SHIFT_STAGE);
  } catch (error) {
    yield put(createShiftStageFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleCreateShiftStage };

