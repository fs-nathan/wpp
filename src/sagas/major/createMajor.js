import { call, put } from 'redux-saga/effects';
import { createMajorSuccess, createMajorFail } from '../../actions/major/createMajor';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_MAJOR } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(CREATE_MAJOR);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createMajorFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createMajor,
}
