import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listWeeksInYearFail, listWeeksInYearSuccess } from '../../../actions/calendar/weeklyCalendar/listWeeksInYear';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListWeeksInYear({ year }) {
  try {
    const config = {
      url: '/work-schedule/get-list-week',
      method: 'get',
      params: {
        year: year
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listWeeksInYear(action) {
  try {
    const { data: weeks } = yield call(doListWeeksInYear, action.options);
    yield put(listWeeksInYearSuccess({ weeks }, action.options));
  } catch (error) {
    yield put(listWeeksInYearFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listWeeksInYear };

