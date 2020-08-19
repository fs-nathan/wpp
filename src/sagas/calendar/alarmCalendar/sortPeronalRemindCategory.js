import { CustomEventEmitter, SORT_PERSONAL_REMIND_CATEGORY } from "constants/events";
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { sortPersonalRemindCategoryFail, sortPersonalRemindCategorySuccess } from '../../../actions/calendar/alarmCalendar/sortPersonalRemindCategory';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doSortPersonalRemindCategory({ category_id, sort_index }) {
  try {
    const config = {
      url: '/personal-remind-category/sort',
      method: 'post',
      data: {
        category_id: category_id,
        sort_index: sort_index
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortPersonalRemindCategory(action) {
  try {
    const { categories: categories } = yield call(doSortPersonalRemindCategory, action.options);
    yield put(sortPersonalRemindCategorySuccess({ categories }, action.options));
    CustomEventEmitter(SORT_PERSONAL_REMIND_CATEGORY);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortPersonalRemindCategoryFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { sortPersonalRemindCategory };

