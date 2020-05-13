import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listPositionFail, listPositionSuccess } from '../../actions/position/listPosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_POSITION } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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

function* listPosition(action) {
  try {
    const { position: positions } = yield call(doListPosition);
    yield put(listPositionSuccess({ positions }, action.options));
    CustomEventEmitter(LIST_POSITION.SUCCESS);
  } catch (error) {
    yield put(listPositionFail(error, action.options));
    CustomEventEmitter(LIST_POSITION.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listPosition, };

