import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteMajorFail, deleteMajorSuccess } from '../../actions/major/deleteMajor';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_MAJOR } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteMajor({ majorId }) {
  try {
    const config = {
      url: '/delete-major',
      method: 'delete',
      data: {
        major_id: majorId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteMajor(action) {
  try {
    yield call(doDeleteMajor, action.options);
    yield put(deleteMajorSuccess(action.options));
    CustomEventEmitter(DELETE_MAJOR.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteMajorFail(error, action.options));
    CustomEventEmitter(DELETE_MAJOR.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteMajor, };

