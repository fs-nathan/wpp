import { CustomEventEmitter, DELETE_PERSONAL_REMIND_CATEGORY } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deletePersonalRemindCategoryFail, deletePersonalRemindCategorySuccess } from '../../../actions/calendar/alarmCalendar/deletePersonalRemindCategory';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doDeletePersonalRemindCategory({ categoryID }) {
  try {
    const config = {
      url: '/personal-remind-category/delete',
      method: 'post',
      data: {
        category_id: categoryID
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deletePersonalRemindCategory(action) {
  try {
    const { state: state } = yield call(doDeletePersonalRemindCategory, action.options);
    yield put(deletePersonalRemindCategorySuccess({ state }, action.options));
    CustomEventEmitter(DELETE_PERSONAL_REMIND_CATEGORY);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deletePersonalRemindCategoryFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { deletePersonalRemindCategory };

