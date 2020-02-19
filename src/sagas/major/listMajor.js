import { call, put } from 'redux-saga/effects';
import { listMajorSuccess, listMajorFail } from '../../actions/major/listMajor';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListMajor() {
  try {
    const config = {
      url: '/list-major',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listMajor() {
  try {
    const { majors } = yield call(doListMajor);
    yield put(listMajorSuccess({ majors }, action.options));
  } catch (error) {
    yield put(listMajorFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listMajor,
}
