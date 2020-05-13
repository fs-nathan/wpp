import { CustomEventEmitter, WEEKLY_SCHEDULE_SETTING_START_DAY } from 'constants/events';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { settingStartingDayFail, settingStartingDaySuccess } from '../../../actions/calendar/weeklyCalendar/settingStartingDay';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doSettingStartingDay({ day }) {
  try {
    const config = {
      url: '/work-schedule/setting-day-start-week',
      method: 'post',
      data: {
        day_start: day
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* settingStartingDay(action) {
  try {
    const { state: state } = yield call(doSettingStartingDay, action.options);
    yield put(settingStartingDaySuccess({ state }, action.options));
    CustomEventEmitter(WEEKLY_SCHEDULE_SETTING_START_DAY);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(settingStartingDayFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { settingStartingDay };

