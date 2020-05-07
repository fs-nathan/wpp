import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateLevelFail, updateLevelSuccess } from '../../actions/level/updateLevel';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_LEVEL } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUpdateLevel({ levelId, name, description }) {
  try {
    const config = {
      url: '/update-level',
      method: 'put',
      data: {
        level_id: levelId,
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

function* updateLevel(action) {
  try {
    const { level } = yield call(doUpdateLevel, action.options);
    yield put(updateLevelSuccess({ level }, action.options));
    CustomEventEmitter(UPDATE_LEVEL.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateLevelFail(error, action.options));
    CustomEventEmitter(UPDATE_LEVEL.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateLevel, };

