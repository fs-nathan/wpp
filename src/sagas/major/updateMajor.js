import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateMajorFail, updateMajorSuccess } from '../../actions/major/updateMajor';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_MAJOR } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(updateMajorSuccess({ major }, action.options));
    CustomEventEmitter(UPDATE_MAJOR.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateMajorFail(error, action.options));
    CustomEventEmitter(UPDATE_MAJOR.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateMajor, };

