import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { setWorkingDaysFail, setWorkingDaysSuccess } from '../../../actions/calendar/projectCalendar/setWorkingDay';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doSetWorkingDay({ scheduleGroupID, workingDays }) {
  try {
    const config = {
      url: '/group-schedule/setting-work-days-of-week',
      method: 'post',
      data: {
        schedule_group_id: scheduleGroupID,
        days_work: workingDays
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectScheduleSetWorkingDay(action) {
  try {
    const { schedule_group: scheduleGroup } = yield call(doSetWorkingDay, action.options);
    yield put(setWorkingDaysSuccess({ scheduleGroup }, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(setWorkingDaysFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectScheduleSetWorkingDay };

