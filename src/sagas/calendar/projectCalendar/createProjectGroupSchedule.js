import { CREATE_PROJECT_GROUP_SCHEDULE, CustomEventEmitter } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createProjectScheduleFail, createProjectScheduleSuccess } from '../../../actions/calendar/projectCalendar/createProjectGroupSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreateProjectSchedule({ name, description }) {
  try {
    const config = {
      url: '/group-schedule/create-schedule',
      method: 'post',
      data: {
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

function* createProjectGroupSchedule(action) {
  try {
    const { schedule_group: scheduleGroup } = yield call(doCreateProjectSchedule, action.options);
    yield put(createProjectScheduleSuccess({ scheduleGroup }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(CREATE_PROJECT_GROUP_SCHEDULE);
  } catch (error) {
    yield put(createProjectScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { createProjectGroupSchedule };

