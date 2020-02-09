import { call, put } from 'redux-saga/effects';
import { updateMajorSuccess, updateMajorFail } from '../../actions/major/updateMajor';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_MAJOR } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doUpdateMajor({ majorId, name, description }) {
  try {
    const config = {
      url: '/update-major',
      method: 'put',
      data: {
        major_id: majorId,
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

function* updateMajor(action) {
  try {
    const { major } = yield call(doUpdateMajor, action.options);
    yield put(updateMajorSuccess({ major }));
    CustomEventEmitter(UPDATE_MAJOR);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateMajorFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateMajor,
}
