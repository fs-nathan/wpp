import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createLevelFail, createLevelSuccess } from '../../actions/level/createLevel';
import { apiService } from '../../constants/axiosInstance';
import { CREATE_LEVEL, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    CustomEventEmitter(CREATE_LEVEL.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createLevelFail(error, action.options));
    CustomEventEmitter(CREATE_LEVEL.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { createLevel, };

