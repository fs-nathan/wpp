import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createMajorFail, createMajorSuccess } from '../../actions/major/createMajor';
import { apiService } from '../../constants/axiosInstance';
import { CREATE_MAJOR, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doCreateMajor({ name, description }) {
  try {
    const config = {
      url: '/create-major',
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

function* createMajor(action) {
  try {
    const { major } = yield call(doCreateMajor, action.options);
    yield put(createMajorSuccess({ major }, action.options));
    CustomEventEmitter(CREATE_MAJOR.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createMajorFail(error, action.options));
    CustomEventEmitter(CREATE_MAJOR.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { createMajor, };

