import { call, put } from 'redux-saga/effects';
import { createIconSuccess, createIconFail } from '../../actions/icon/createIcon';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_ICON } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCreateIcon({ icon }) {
  try {
    const formData = new FormData();
    formData.append('image', icon);
    const config = {
      url: '/create-icon',
      method: 'post',
      data: formData,
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createIcon(action) {
  try {
    const { data_icon: dataIcon } = yield call(doCreateIcon, action.options);
    yield put(createIconSuccess({ dataIcon }, action.options));
    CustomEventEmitter(CREATE_ICON);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createIconFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createIcon,
}
