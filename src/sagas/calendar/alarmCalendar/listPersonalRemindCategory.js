import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listPersonalRemindCategoryFail, listPersonalRemindCategorySuccess } from '../../../actions/calendar/alarmCalendar/listPersonalRemindCategory';
import { apiService } from '../../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doListPersonalRemindCategory() {
  try {
    const config = {
      url: '/personal-remind-category/list?type=statistic',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listPersonalRemindCategory(action) {
  try {
    const { categories: categories } = yield call(doListPersonalRemindCategory, action.options);
    yield put(listPersonalRemindCategorySuccess({ categories }, action.options));
  } catch (error) {
    yield put(listPersonalRemindCategoryFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listPersonalRemindCategory };

