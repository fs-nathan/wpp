import { call, put } from 'redux-saga/effects';
import { listIconSuccess, listIconFail } from '../../actions/icon/listIcon';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListCreatedIcon() {
  try {
    const config = {
      url: '/list-icon',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

async function doListDefaultIcon() {
  try {
    const config = {
      url: '/get-icon-default',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

async function doListIcon() {
  try {
    const result = await Promise.all([doListDefaultIcon(), doListCreatedIcon()]);
    const { icons: defaults } = result[0];
    const { icons } = result[1];
    return ({
      icons, 
      defaults, 
    });
  } catch (error) {
    throw error;
  }
}

function* listIcon() {
  try {
    const { icons, defaults } = yield call(doListIcon);
    yield put(listIconSuccess({ icons, defaults }));
  } catch (error) {
    yield put(listIconFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listIcon,
}
