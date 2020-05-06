import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listLevelFail, listLevelSuccess } from '../../actions/level/listLevel';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_LEVEL } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListLevel() {
  try {
    const config = {
      url: '/list-level',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listLevel(action) {
  try {
    const { levels } = yield call(doListLevel);
    yield put(listLevelSuccess({ levels }, action.options));
    CustomEventEmitter(LIST_LEVEL.SUCCESS);
  } catch (error) {
    yield put(listLevelFail(error, action.options));
    CustomEventEmitter(LIST_LEVEL.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { listLevel, };

