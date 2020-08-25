import { CustomEventEmitter, DELETE_PERSONAL_REMIND } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deletePersonalRemindFail, deletePersonalRemindSuccess } from '../../../actions/calendar/alarmCalendar/deletePersonalRemind';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeletePersonalRemind({ remindID }) {
  try {
    const config = {
      url: '/personal-remind/delete',
      method: 'post',
      data: {
        remind_id: remindID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deletePersonalRemind(action) {
  try {
    const { remind: remind } = yield call(doDeletePersonalRemind, action.options);
    yield put(deletePersonalRemindSuccess({ remind }, action.options));
    CustomEventEmitter(DELETE_PERSONAL_REMIND);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deletePersonalRemindFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { deletePersonalRemind };
