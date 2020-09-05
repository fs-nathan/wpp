import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getGroupScheduleDetailFail, getGroupScheduleDetailSuccess } from '../../../actions/calendar/projectCalendar/getGroupScheduleDetail';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doProjectGroupScheduleDetail({ scheduleID }) {
  try {
    const config = {
      url: '/group-schedule/detail-schedule',
      method: 'get',
      params: {
        schedule_group_id: scheduleID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* projectGroupScheduleDetail(action) {
  try {
    const { schedule: schedule, url_view_more } = yield call(doProjectGroupScheduleDetail, action.options);
    yield put(getGroupScheduleDetailSuccess({ schedule, url_view_more }, action.options));
  } catch (error) {
    yield put(getGroupScheduleDetailFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { projectGroupScheduleDetail };

