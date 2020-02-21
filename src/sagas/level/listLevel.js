import { call, put } from 'redux-saga/effects';
import { listLevelSuccess, listLevelFail } from '../../actions/level/listLevel';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
  } catch (error) {
    yield put(listLevelFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  listLevel,
}
