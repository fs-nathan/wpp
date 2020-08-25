import { CREATE_PERSONAL_REMIND, CustomEventEmitter } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createPersonalRemindFail, createPersonalRemindSuccess } from '../../../actions/calendar/alarmCalendar/createPersonalRemind';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreatePersonalRemind({ model }) {
  try {
    const config = {
      url: '/personal-remind/create',
      method: 'post',
      data: {
        content: model.content,
        category_id: model.categoryID,
        date_remind: model.dateRemind,
        type_remind: model.typeRemind,
        remind_before: model.remindBefore,
        members_assign: model.userAssign
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createPersonalRemind(action) {
  try {
    const { remind: remind } = yield call(doCreatePersonalRemind, action.options);
    yield put(createPersonalRemindSuccess({ remind }, action.options));
    CustomEventEmitter(CREATE_PERSONAL_REMIND);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createPersonalRemindFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { createPersonalRemind };

