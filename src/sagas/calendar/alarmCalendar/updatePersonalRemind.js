import { CustomEventEmitter, UPDATE_PERSONAL_REMIND } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updatePersonalRemindFail, updatePersonalRemindSuccess } from '../../../actions/calendar/alarmCalendar/updatePersonalRemind';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdatePersonalRemind({ model }) {
  try {
    const config = {
      url: '/personal-remind/update',
      method: 'post',
      data: {
        remind_id: model.remindID,
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

function* updatePersonalRemind(action) {
  try {
    const { remind: remind } = yield call(doUpdatePersonalRemind, action.options);
    yield put(updatePersonalRemindSuccess({ remind }, action.options));
    CustomEventEmitter(UPDATE_PERSONAL_REMIND);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updatePersonalRemindFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { updatePersonalRemind };

