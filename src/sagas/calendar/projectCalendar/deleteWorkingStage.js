import { CustomEventEmitter, PROJECT_SCHEDULE_DELETE_WORKING_STAGE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteWorkingStageFail, deleteWorkingStageSuccess } from '../../../actions/calendar/projectCalendar/deleteWorkingStage';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteWorkingStage({ scheduleGroupID, stageID }) {
  try {
    const config = {
      url: '/group-schedule/delete-work-stage',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        stage_id: stageID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleDeleteWorkingStage(action) {
  try {
    const { stage_id: stage } = yield call(doDeleteWorkingStage, action.options);
    yield put(deleteWorkingStageSuccess({ stage }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_DELETE_WORKING_STAGE);
  } catch (error) {
    yield put(deleteWorkingStageFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleDeleteWorkingStage };

