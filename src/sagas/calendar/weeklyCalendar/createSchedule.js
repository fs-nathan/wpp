import { CREATE_WEEKLY_SCHEDULE, CustomEventEmitter } from 'constants/events';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createScheduleFail, createScheduleSuccess } from '../../../actions/calendar/weeklyCalendar/createSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreateSchedule({ schedule }) {
  try {
    const config = {
      url: '/work-schedule/create',
      method: 'post',
      data: {
        week_schedule_id: schedule.week_schedule_id,
        schedule_date: schedule.schedule_date,
        schedule_time: schedule.schedule_time,
        title: schedule.title,
        place: schedule.place,
        content: schedule.content,
        set_remind: schedule.set_remind,
        remind_before: schedule.remind_before,
        assign_to_all: schedule.assign_to_all,
        user_assign: schedule.user_assign
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createSchedule(action) {
  try {
    const { data: schedule } = yield call(doCreateSchedule, action.options);
    yield put(createScheduleSuccess({ schedule }, action.options));
    CustomEventEmitter(CREATE_WEEKLY_SCHEDULE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { createSchedule };

