import { CustomEventEmitter, UPDATE_PROJECT_GROUP_SCHEDULE } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateProjectScheduleFail, updateProjectScheduleSuccess } from '../../../actions/calendar/projectCalendar/updateProjectGroupSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateProjectSchedule({ schedule_group_id, name, description }) {
  try {
    const config = {
      url: '/group-schedule/update-schedule',
      method: 'post',
      data: {
        schedule_group_id: schedule_group_id,
        name: name,
        description: description
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateProjectGroupSchedule(action) {
  try {
    const { schedule_group: scheduleGroup } = yield call(doUpdateProjectSchedule, action.options);
    yield put(updateProjectScheduleSuccess({ scheduleGroup }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(UPDATE_PROJECT_GROUP_SCHEDULE);
  } catch (error) {
    yield put(updateProjectScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { updateProjectGroupSchedule };

