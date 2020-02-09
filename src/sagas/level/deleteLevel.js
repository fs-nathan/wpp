import { call, put } from 'redux-saga/effects';
import { deleteLevelSuccess, deleteLevelFail } from '../../actions/level/deleteLevel';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_LEVEL } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doDeleteLevel({ levelId }) {
  try {
    const config = {
      url: '/delete-level',
      method: 'delete',
      data: {
        level_id: levelId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteLevel(action) {
  try {
    yield call(doDeleteLevel, action.options);
    yield put(deleteLevelSuccess());
    CustomEventEmitter(DELETE_LEVEL);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteLevelFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteLevel,
}
