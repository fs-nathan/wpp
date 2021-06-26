import { CustomEventEmitter, UPDATE_WEEKLY_SCHEDULE } from 'constants/events';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateScheduleFail, updateScheduleSuccess } from '../../../actions/calendar/weeklyCalendar/updateSchedule';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateSchedule({ schedule }) {
  try {
    const config = {
      url: '/work-schedule/update',
      method: 'post',
      data: {
        schedule_id: schedule.schedule_id,
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

function* updateSchedule(action) {
  try {
    const { data: schedule } = yield call(doUpdateSchedule, action.options);
    yield put(updateScheduleSuccess({ schedule }, action.options));
    CustomEventEmitter(UPDATE_WEEKLY_SCHEDULE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateScheduleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { updateSchedule };

