import { CREATE_PERSONAL_REMIND_CATEGORY, CustomEventEmitter } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createPersonalRemindCategoryFail, createPersonalRemindCategorySuccess } from '../../../actions/calendar/alarmCalendar/createPersonalRemindCategory';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doCreatePersonalRemindCategory({ name, color }) {
  try {
    const config = {
      url: '/personal-remind-category/create',
      method: 'post',
      data: {
        name: name,
        color: color
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createPersonalRemindCategory(action) {
  try {
    const { category: category } = yield call(doCreatePersonalRemindCategory, action.options);
    yield put(createPersonalRemindCategorySuccess({ category }, action.options));
    CustomEventEmitter(CREATE_PERSONAL_REMIND_CATEGORY);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createPersonalRemindCategoryFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { createPersonalRemindCategory };

