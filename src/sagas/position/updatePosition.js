import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updatePositionFail, updatePositionSuccess } from '../../actions/position/updatePosition';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_POSITION } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUpdatePosition({ positionId, name, description }) {
  try {
    const config = {
      url: '/update-position',
      method: 'put',
      data: {
        position_id: positionId,
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

function* updatePosition(action) {
  try {
    const { position } = yield call(doUpdatePosition, action.options);
    yield put(updatePositionSuccess({ position }, action.options));
    CustomEventEmitter(UPDATE_POSITION.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updatePositionFail(error, action.options));
    CustomEventEmitter(UPDATE_POSITION.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updatePosition, };

