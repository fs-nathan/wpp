import { call, put } from 'redux-saga/effects';
import { deleteMajorSuccess, deleteMajorFail } from '../../actions/major/deleteMajor';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_MAJOR } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(DELETE_MAJOR);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteMajorFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteMajor,
}
