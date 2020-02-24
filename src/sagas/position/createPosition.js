import { call, put } from 'redux-saga/effects';
import { createPositionSuccess, createPositionFail } from '../../actions/position/createPosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_POSITION } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(CREATE_POSITION);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createPositionFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createPosition,
}
