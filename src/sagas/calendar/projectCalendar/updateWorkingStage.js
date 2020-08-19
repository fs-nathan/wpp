import { CustomEventEmitter, PROJECT_SCHEDULE_UPDATE_WORKING_STAGE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateWorkingStageFail, updateWorkingStageSuccess } from '../../../actions/calendar/projectCalendar/updateWorkingStage';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateWorkingStage({ scheduleGroupID, stageID, dateStart, dateEnd }) {
  try {
    const config = {
      url: '/group-schedule/update-work-stage',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        stage_id: stageID,
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

function* projectScheduleUpdateWorkingStage(action) {
  try {
    const { stage: stage } = yield call(doUpdateWorkingStage, action.options);
    yield put(updateWorkingStageSuccess({ stage }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_UPDATE_WORKING_STAGE);
  } catch (error) {
    yield put(updateWorkingStageFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleUpdateWorkingStage };

