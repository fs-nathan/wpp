import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listMajorFail, listMajorSuccess } from '../../actions/major/listMajor';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_MAJOR } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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

function* listMajor(action) {
  try {
    const { majors } = yield call(doListMajor);
    yield put(listMajorSuccess({ majors }, action.options));
    CustomEventEmitter(LIST_MAJOR.SUCCESS);
  } catch (error) {
    yield put(listMajorFail(error, action.options));
    CustomEventEmitter(LIST_MAJOR.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listMajor, };

