import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteLevelFail, deleteLevelSuccess } from '../../actions/level/deleteLevel';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_LEVEL } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(deleteLevelSuccess(action.options));
    CustomEventEmitter(DELETE_LEVEL.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteLevelFail(error, action.options));
    CustomEventEmitter(DELETE_LEVEL.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteLevel, };

