import { call, put } from 'redux-saga/effects';
import { listPositionSuccess, listPositionFail } from '../../actions/position/listPosition';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListPosition() {
  try {
    const config = {
      url: '/list-position',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listPosition() {
  try {
    const { position: positions } = yield call(doListPosition);
    yield put(listPositionSuccess({ positions }, action.options));
  } catch (error) {
    yield put(listPositionFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listPosition,
}
