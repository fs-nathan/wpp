import { CustomEventEmitter, UPDATE_PERSONAL_REMIND_CATEGORY } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updatePersonalRemindCategoryFail, updatePersonalRemindCategorySuccess } from '../../../actions/calendar/alarmCalendar/updatePersonalRemindCategory';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdatePersonalRemindCategory({ categoryID, name, color }) {
  try {
    const config = {
      url: '/personal-remind-category/update',
      method: 'post',
      data: {
        category_id: categoryID,
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

function* updatePersonalRemindCategory(action) {
  try {
    const { category: category } = yield call(doUpdatePersonalRemindCategory, action.options);
    yield put(updatePersonalRemindCategorySuccess({ category }, action.options));
    CustomEventEmitter(UPDATE_PERSONAL_REMIND_CATEGORY);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updatePersonalRemindCategoryFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { updatePersonalRemindCategory };

