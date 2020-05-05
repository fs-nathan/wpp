import { CustomEventEmitter, DELETE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteProjectScheduleFail, deleteProjectScheduleSuccess } from '../../../actions/calendar/projectCalendar/deleteProjectGroupSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeleteProjectSchedule({ schedule_group_id }) {
  try {
    const config = {
      url: '/group-schedule/delete-schedule',
      method: 'post',
      data: {
        schedule_group_id: schedule_group_id
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteProjectGroupSchedule(action) {
  try {
    const { state: state } = yield call(doDeleteProjectSchedule, action.options);
    yield put(deleteProjectScheduleSuccess({ state }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(DELETE_PROJECT_GROUP_SCHEDULE);
  } catch (error) {
    yield put(deleteProjectScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { deleteProjectGroupSchedule };
