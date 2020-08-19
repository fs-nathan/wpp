import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createPositionFail, createPositionSuccess } from '../../actions/position/createPosition';
import { apiService } from '../../constants/axiosInstance';
import { CREATE_POSITION, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doCreatePosition({ name, description }) {
  try {
    const config = {
      url: '/create-position',
      method: 'post',
      data: {
        name,
        description,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createPosition(action) {
  try {
    const { position } = yield call(doCreatePosition, action.options);
    yield put(createPositionSuccess({ position }, action.options));
    CustomEventEmitter(CREATE_POSITION.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createPositionFail(error, action.options));
    CustomEventEmitter(CREATE_POSITION.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { createPosition, };

