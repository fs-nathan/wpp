import { CustomEventEmitter, PROJECT_SCHEDULE_CREATE_WORKING_STAGE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { addWorkingStageFail, addWorkingStageSuccess } from '../../../actions/calendar/projectCalendar/createWorkingStage';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreateWorkingStage({ scheduleGroupID, dateStart, dateEnd }) {
  try {
    const config = {
      url: '/group-schedule/create-work-stage',
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

function* projectScheduleCreateWorkingStage(action) {
  try {
    const { stage: stage } = yield call(doCreateWorkingStage, action.options);
    yield put(addWorkingStageSuccess({ stage }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_CREATE_WORKING_STAGE);
  } catch (error) {
    yield put(addWorkingStageFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleCreateWorkingStage };

