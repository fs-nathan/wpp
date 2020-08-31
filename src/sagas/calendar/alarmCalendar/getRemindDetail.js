import { GET_REMIND_DETAIL_FAIL, CustomEventEmitter } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getRemindDetailSuccess, getRemindDetailFail } from '../../../actions/calendar/alarmCalendar/getRemindDetail';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doGetRemindDetail({ remind_id }) {
  try {
    const config = {
      url: '/personal-remind/detail',
      method: 'get',
      params: {
        remind_id
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getRemindDetail(action) {
  try {
    const { remind: remind } = yield call(doGetRemindDetail, action.options);
    yield put(getRemindDetailSuccess({ remind }, action.options));
  } catch (error) {
    yield put(getRemindDetailFail(error, action.options));
    CustomEventEmitter(GET_REMIND_DETAIL_FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getRemindDetail };