import { CustomEventEmitter, PROJECT_SCHEDULE_SETTING_STARTING_DAY } from 'constants/events';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { settingStartingDayFail, settingStartingDaySuccess } from '../../../actions/calendar/projectCalendar/settingStartingDay';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doSettingStartingDay({ day, scheduleGroupID }) {
  try {
    const config = {
      url: '/group-schedule/setting-day-start-week',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        day_start: day
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleSettingStartingDay(action) {
  try {
    const { schedule_group: scheduleGroup } = yield call(doSettingStartingDay, action.options);
    yield put(settingStartingDaySuccess({ scheduleGroup }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    CustomEventEmitter(PROJECT_SCHEDULE_SETTING_STARTING_DAY);
  } catch (error) {
    yield put(settingStartingDayFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleSettingStartingDay };

