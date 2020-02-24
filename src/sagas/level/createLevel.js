import { call, put } from 'redux-saga/effects';
import { createLevelSuccess, createLevelFail } from '../../actions/level/createLevel';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_LEVEL } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCreateLevel({ name, description }) {
  try {
    const config = {
      url: '/create-level',
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

function* createLevel(action) {
  try {
    const { level } = yield call(doCreateLevel, action.options);
    yield put(createLevelSuccess({ level }, action.options));
    CustomEventEmitter(CREATE_LEVEL);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createLevelFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createLevel,
}
